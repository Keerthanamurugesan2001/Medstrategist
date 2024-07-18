
frappe.ui.form.on("Employee", {
    	onload(frm) {
            skill_custom_fetch(frm);
            get_skill_set_and_training(frm);
    	},

    });

function get_skill_set_and_training(frm) {
    let val = ["Induction Training"];

    val.forEach(function (d) {
        let row = frm.add_child('custom_skill_set_and_training');
        row.skill_set = d;
    });

    frm.refresh_field('custom_skill');
}

function skill_custom_fetch(frm) {
    let val = ["Type of Employment", "Area Of Expertise", "Skill Set", "Responsibility"];

    val.forEach(function (d) {
        let row = frm.add_child('custom_skill');
        row.skill_set = d;
    });

    frm.refresh_field('custom_skill');
}

