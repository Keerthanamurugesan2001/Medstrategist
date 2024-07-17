
frappe.ui.form.on("Employee", {
    	onload(frm) {
            skill_custom_fetch(frm);

    	},

    });
function skill_custom_fetch(frm) {
    let val = ["Type of Employment", "Area Of Expertise", "Skill Set", "Responsibility"];

    val.forEach(function (d) {
        let row = frm.add_child('custom_skill');
        row.skill_set = d;
    });

    frm.refresh_field('custom_skill');
}

