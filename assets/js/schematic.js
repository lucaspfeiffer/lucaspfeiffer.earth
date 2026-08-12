/* schematic.js — tapping a part of the drawing opens its note.

   One note is open at a time across the whole schematic, and it opens
   immediately under the row that holds the part, with a caret pointing back up
   at it, so the drawing above it never moves.

   Each rack is authored as ONE row, so at full width "under the row" is just
   "after the rack" and nothing has to move. When the rack stacks — a phone, or
   any width where the two parts no longer share a line — the plate goes inside
   the tapped cell instead, because otherwise the note for the first part would
   open below the second one.

   Everything animated here is grid-template-rows, opacity, transform and the
   caret's left — no layout is measured on scroll, and nothing is measured at
   all until a tap. Without javascript the notes are already in the page as
   prose under each part; the `js` class on <html> is what hides them.
*/
(function () {
    'use strict';

    document.documentElement.classList.add('js');

    var sch = document.querySelector('.sch');
    if (!sch) return;

    var open = null;   // the .node currently on

    // Give every rack a plate to open into.
    var racks = [].slice.call(sch.querySelectorAll('.rack'));
    racks.forEach(function (rack) {
        // A rack can name a plate that already sits somewhere specific in the
        // markup (see the last one — its plate must not sit inside .loopspan,
        // or opening it would stretch the return line). Otherwise, one is made
        // and dropped straight after the rack.
        var authored = rack.dataset.plate && document.getElementById(rack.dataset.plate);
        var plate = authored || document.createElement('div');
        plate.className = 'plate';
        plate.setAttribute('role', 'region');
        plate.innerHTML =
            '<div class="plate-clip"><div class="plate-box">' +
            '<button class="plate-shut" type="button" aria-label="Close">&times;</button>' +
            '<h3 class="plate-title"></h3>' +
            '<div class="plate-body"></div>' +
            '</div></div>';
        if (!authored) rack.parentNode.insertBefore(plate, rack.nextSibling);
        rack._plate = plate;
        rack._fixed = !!authored;   // an authored plate is placed on purpose; never move it
        rack._home = plate.parentNode;
        rack._after = plate.nextSibling;
        plate.querySelector('.plate-shut').addEventListener('click', function () {
            shut();
        });
    });

    function plateOf(node) {
        return node.closest('.rack')._plate;
    }

    // Are this rack's parts still on one line?
    function stacked(rack) {
        var cells = rack.querySelectorAll('.cell');
        return cells.length > 1 && cells[0].offsetTop !== cells[1].offsetTop;
    }

    // Put the plate where the note for this part belongs. Returns true if it moved.
    function place(node) {
        var rack = node.closest('.rack');
        var plate = rack._plate;
        var want = (!rack._fixed && stacked(rack)) ? node.closest('.cell') : rack._home;
        if (plate.parentNode === want && (want !== rack._home || plate.nextSibling === rack._after)) {
            return false;
        }
        if (want === rack._home) want.insertBefore(plate, rack._after);
        else want.appendChild(plate);
        return true;
    }

    function fill(node) {
        var plate = plateOf(node);
        var note = node.parentNode.querySelector('.node-note');
        plate.querySelector('.plate-title').textContent = node.dataset.title || '';
        plate.querySelector('.plate-body').innerHTML = note ? note.innerHTML : '';
        plate.style.setProperty('--caret', caretX(node, plate) + 'px');
    }

    function caretX(node, plate) {
        var n = node.getBoundingClientRect();
        var p = plate.getBoundingClientRect();
        return Math.round(n.left + n.width / 2 - p.left);
    }

    function shut() {
        if (!open) return;
        var plate = plateOf(open);
        plate.classList.remove('is-open');
        open.classList.remove('is-on');
        open.setAttribute('aria-expanded', 'false');
        open = null;
    }

    function show(node) {
        var plate = plateOf(node);
        var already = open && plateOf(open) === plate;

        if (open) {
            open.classList.remove('is-on');
            open.setAttribute('aria-expanded', 'false');
            if (!already) plateOf(open).classList.remove('is-open');
        }

        // If the plate has to move to sit under this part's row, it reopens
        // there rather than sliding the caret across a gap it cannot reach.
        if (place(node) && already) {
            plate.classList.remove('is-open');
            already = false;
        }

        open = node;
        node.classList.add('is-on');
        node.setAttribute('aria-expanded', 'true');

        if (already) {
            // Same plate, different part: fade the words, keep the box, slide
            // the caret across. Swapping text under a moving box reads worse.
            plate.classList.add('plate-swap');
            plate.style.setProperty('--caret', caretX(node, plate) + 'px');
            window.setTimeout(function () {
                fill(node);
                plate.classList.remove('plate-swap');
            }, 110);
        } else {
            fill(node);
            void plate.offsetHeight;   // reflow, so a just-moved plate still animates open
            plate.classList.add('is-open');
        }
    }

    [].slice.call(sch.querySelectorAll('.node')).forEach(function (node) {
        node.setAttribute('aria-expanded', 'false');
        node.addEventListener('click', function () {
            if (open === node) shut();
            else show(node);
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && open) {
            var n = open;
            shut();
            n.focus();
        }
    });

    // A rack that stacks or unstacks changes where the open note belongs, and
    // the caret has to follow the part it points at.
    var pending;
    window.addEventListener('resize', function () {
        if (!open) return;
        window.clearTimeout(pending);
        pending = window.setTimeout(function () {
            place(open);
            var plate = plateOf(open);
            plate.style.setProperty('--caret', caretX(open, plate) + 'px');
        }, 120);
    });
}());
