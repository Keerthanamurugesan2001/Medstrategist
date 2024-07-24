// Copyright (c) 2024, keerthana.murugesan@softsuave.com and contributors
// For license information, please see license.txt

frappe.ui.form.on("Organization", {
	refresh(frm) {
        if(frm.is_new()) {
            frm.page.set_title('Add Organization');
            frappe.call({
                method: "medstrategist.medstrategist.doctype.organization.organization.get_organization_detail",
                args: {
                    doc: frm.doc
                },
                callback: function(response) {
                    data = response.message
                    if (data) {
                        for (let field in data) {
                            if (field !== "owner") {
                                frm.set_value(field, response.message[field]);
                                // frm.refresh_field(field)
                                // console.log(field)
                            }
                        }
                        // frm.refresh_fields()
                    }
                }
            });
            checkAndHideButton();
            
            frm.fields_dict.next_company_profile.$wrapper.wrap('<div class="next_company_profile"></div>');
            frm.fields_dict.next_product_detail.$wrapper.wrap('<div class="next_company_profile"></div>');
            frm.fields_dict.next_function_and_department.$wrapper.wrap('<div class="next_company_profile"></div>');
            frm.fields_dict.next_documentaion_detail.$wrapper.wrap('<div class="next_company_profile"></div>');
            frm.fields_dict.next_basic_setting.$wrapper.wrap('<div class="next_company_profile"></div>');
            
            $('.next_company_profile').css({
                'text-align': 'right',
                'margin-bottom': '15px',
            }).find('button').css({
                'background-color': '#171717',
                'color': 'white'
            });
            
        }
	},

    onload(frm) {
        function_or_department_custom_fetch(frm);
    },
    next_company_profile (frm) {
        next_button(frm);
        checkAndHideButton();
    },
    next_product_detail (frm){
        next_button(frm);
        checkAndHideButton();
    },
    next_function_and_department (frm){
        next_button(frm);
        checkAndHideButton();
    },
    next_documentaion_detail (frm){
        next_button(frm);
        checkAndHideButton();
    },
    next_basic_setting (frm){
        next_button(frm);
        checkAndShowButton();
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

function next_button(frm) {
    frappe.call({
        method: "medstrategist.medstrategist.doctype.organization.organization.save_organization_data",
        args: {
            doc: frm.doc
        },
        callback: function (response) {
            debugger;
            if (response.message.status === "success") {
                let tabs = frm.$wrapper.find('.form-tabs .nav-item .nav-link');
                let active_tab = tabs.filter('.active');
                let current_index = tabs.index(active_tab);
                if (current_index < tabs.length - 1) {
                    let next_tab = $(tabs[current_index + 1]);
                    next_tab.trigger('click');
                }
            }
        }
    });
}

function checkAndHideButton() {
    $('.primary-action[data-label="Save"]').hide();
}
function checkAndShowButton() {
    $('.primary-action[data-label="Save"]').show();
}
function function_or_department_custom_fetch(frm) {
    // let val = ["Induction Training"];

    // val.forEach(function (d) {
    //     let row = frm.add_child('custom_skill_set_and_training');
    //     row.skill_set = d;
    // });

    // frm.refresh_field('custom_skill');
}