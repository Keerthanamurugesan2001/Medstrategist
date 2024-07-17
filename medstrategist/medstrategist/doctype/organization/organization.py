# Copyright (c) 2024, keerthana.murugesan@softsuave.com and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
import frappe

class Organization(Document):
	pass

@frappe.whitelist()
def get_all_regulations(select_country):
	
	regulations = frappe.db.sql(f"""
			   select name,location from tabRegulations tr 

""",as_dict=True)
	
	allowed_regulations = get_regulations_by_location(select_country)
	
	return {
        "regulations": regulations,
        "allowed_regulations": allowed_regulations
    }


@frappe.whitelist()
def get_regulations_by_location(country):
	
	regulations = frappe.db.sql(f"""
			  select name from tabRegulations tr where location ='{country}'

""",as_dict=True)

	return regulations


# @frappe.whitelist()
# def get_regulation_details(country):
	

# 	India ={
# 		"ISO 13485" : f"""
# 	<p> ISO 13485 is an international standard that specifies requirements for a quality management system (QMS) tailored to the medical devices industry.</p>
# 	 <p> It is designed for organizations involved in the design, production, installation, and servicing of medical devices and related services. </p>
# 	 <p>The primary purpose of ISO 13485 is to ensure that medical devices consistently meet both customer and regulatory requirements. </p>
# 	 <p>This standard emphasizes the importance of maintaining an effective QMS, addressing risk management, and implementing stringent controls throughout the entire lifecycle of a medical device, from initial design to post-market surveillance.<p/>
# 	  <p> By adhering to ISO 13485, organizations can enhance product safety, improve process efficiency, and ensure regulatory compliance, ultimately fostering greater trust and confidence in their medical devices.</p>
# """,
# 		"ISO 14971" : f"""
# 				<p>ISO 14971 is an international standard that provides a framework for the application of risk management to medical devices.</p>
# 				 <p> It outlines the processes manufacturers should use to identify hazards associated with medical devices, estimate and evaluate the associated risks, control these risks, and monitor the effectiveness of the controls. </p>
# 				 <p>The goal of ISO 14971 is to ensure that risks related to the use of medical devices are systematically identified and managed throughout the entire product lifecycle, from design and development through to production, distribution, and post-market activities. </p>
# 				 <p>By implementing ISO 14971, manufacturers can enhance the safety and performance of their medical devices, comply with regulatory requirements, and improve overall patient safety. This standard is crucial for maintaining the high quality and reliability of medical devices in the healthcare industry.</p>
# """,
# 		"ISO 62304" : f"""
# 			<p>ISO 62304 is an international standard that defines the life cycle requirements for medical device software. </p>
# 			<p>It provides a comprehensive framework for the development and maintenance of software used in medical devices, ensuring safety and reliability. </p>
# 			<p>The standard outlines essential processes, activities, and tasks necessary for software development, including planning, requirements analysis, architectural design, detailed design, unit implementation and verification, integration and integration testing, system testing, and release.</p>
# 			 <p> Additionally, it covers the software maintenance process, risk management process, and configuration management process. By adhering to ISO 62304, medical device manufacturers can ensure that their software meets high-quality standards and complies with regulatory requirements, ultimately enhancing patient safety and product effectiveness.</p>

# """
# 	} 

# 	USA={
# 		"21 CFR Subchapter H" : f"""
# 		<p>21 CFR Subchapter H pertains to "Medical Devices," outlining regulations that ensure the safety and effectiveness of medical devices in the U.S. </p>
# 		<p>It includes several key parts: Part 800 covers general provisions; </p>
# 		<p>Part 801 details labeling requirements; Part 803 focuses on medical device reporting; </p>
# 		<p>Part 804 addresses device tracking;</p>
# 		 <p> Part 820 establishes quality system regulations. </p>
# 		 <p>These regulations are essential for manufacturers to maintain compliance and ensure product safety in the medical device industry. Let me know if you need more specific information!</p>
# """,

# 	} 
# 	Brasil = {
# 		"ANVISA RDC 40/2015": F"""
# 		<p>ANVISA RDC 40/2015 regulates the registration and commercialization of medical devices in Brazil, focusing on safety and efficacy. </p>
# 		<p>It establishes a classification system based on risk, outlines the registration process with required documentation, and emphasizes adherence to quality management systems aligned with international standards.</p>
# 		 <p> Additionally, it mandates post-market surveillance to monitor device performance after commercialization. </p>
# 		<p>This regulation aims to ensure the quality and safety of medical devices in the Brazilian market.</p>
# 		"""
# 	}

# 	if  country == "India":
# 		country = India
# 		return country
# 	if  country == "USA":
# 		country = USA
# 		return USA
# 	if  country == "Brasil":
# 		country = Brasil
# 		return country