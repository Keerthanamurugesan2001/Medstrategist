// Copyright (c) 2024, keerthana.murugesan@softsuave.com and contributors
// For license information, please see license.txt

frappe.ui.form.on("Organization", {
	refresh(frm) {

	},

    onload(frm) {
        function_or_department_custom_fetch(frm);
    },



    select_country: function(frm) {
        // Get all doctypes
        if (frm.doc.select_country) {
            frappe.call({
                method: "medstrategist.medstrategist.doctype.organization.organization.get_all_regulations",
                args: {
                    select_country : frm.doc.select_country,
                },
                
                callback: function(response) {
                    let all_regulation = response.message.regulations;
                    let allowed_regulations = response.message.allowed_regulations;
                    
                    // Generate HTML for checkboxes
                    let checkbox_html = "<div>";
                    for(let i=0;i<all_regulation.length;i++) {
                        let found = 0;
                        for (let j=0;j<allowed_regulations.length;j++){
                            if(all_regulation[i].name == allowed_regulations[j].name){
                                checkbox_html += `
                            <div>
                                <input type="checkbox" id="${all_regulation[i].name}" name="doctype_checkboxes" value="${all_regulation[i].name}" checked>
                                <label for="${all_regulation[i].name}">${all_regulation[i].name}</label>
                            </div>
                        `;
                                found = 1;
                                break;
                            }
                            
                        }
                        if (found == 0){
                            checkbox_html += `
                            <div>
                                <input type="checkbox" id="${all_regulation[i].name}" name="doctype_checkboxes" value="${all_regulation[i].name}" >
                                <label for="${all_regulation[i].name}">${all_regulation[i].name}</label>
                            </div>
                        `;
                        }

                    }
                    checkbox_html += "</div>";

                    // Set HTML content
                    $(frm.fields_dict['regulations'].wrapper).html(checkbox_html);
                }
            });
        }
    }
});

function function_or_department_custom_fetch(frm) {
    // let val = ["Induction Training"];

    // val.forEach(function (d) {
    //     let row = frm.add_child('custom_skill_set_and_training');
    //     row.skill_set = d;
    // });

    // frm.refresh_field('custom_skill');
}