/************************************************************************************************************************/
//Function declarations
/************************************************************************************************************************/

//find object type - logs object type to console
function watsObject(objectName){
	console.log(Object.prototype.toString.call(objectName));
}

//find nodetype
function watsNodeType(objectName){
	var nodeTypeList=['elementnode', 'attributenode','textnode','cdatasectionnode', 'entityreferencenode','entitynode','processinginstructionnode','commentnode','documentnode','documenttypenode','documentfragmentnode','notationnode'];
	console.log(nodeTypeList[objectName.nodeType-1]);
}

//find an HTML tag in child nodes
function findInChildNodes(tagToCheck, domElement){
	var i, matchedElements={
		matchStatus:new Boolean(false),
		matchedObjects:[]
	};
	for(i=0;i<domElement.childNodes.length;i++){
		if((domElement.childNodes[i].tagName)==tagToCheck.toUpperCase()){
			console.log(matchedElements.matchedObjects);
		}
	}
	return matchedElements;
}

//watch the resume form and initiate triggers to update the resume
function formWatchOn(professionOption, resumeformObject, resumePreview){

	//declaring all possible input field tags which will be used to gather inputs for the resume, into an array
	var inputTags=["input", "textarea", "select"];
	var professionName="";

	//update style based on profession selection
	function updateProfession(){
		function setPreviewClass(){
			resumePreview.getElementsByTagName('h4')[0].innerHTML="";
			if(resumePreview.getElementsByTagName('h3')[0]!=""){

			}
			switch(this.id){
				case 'designer':
					document.getElementById("resume_preview").className = '';
					document.getElementById("resume_preview").className += 'designer';
					professionName="Designer";
					break;
				case 'dev':
					document.getElementById("resume_preview").className = '';
					document.getElementById("resume_preview").className += 'dev';
					professionName="Developer";
					break;
				case 'others':
					document.getElementById("resume_preview").className = '';
					document.getElementById("resume_preview").className += 'others';
					break;
			}
		}
		var i;
		var radioOptions=professionOption.getElementsByTagName('input');
		var optionCount=professionOption.getElementsByTagName('input').length;
		for(i=0;i<optionCount;i++){
			radioOptions[i].addEventListener("click", setPreviewClass, false);
		}
	}

	//update other information 
	function updateBasicInfo(){
		var i;
		var basicInfoFieldset=document.getElementById("basic_info");//obtaining the fieldset object for basicinfo
		for(i=0;i<basicInfoFieldset.elements.length;i++){
			basicInfoFieldset.elements[i].addEventListener("keyup", writeBasicInfo, false);
		}
		function writeBasicInfo(e){

			switch(e.target.id){

				//when update happens in the 'name' input
				case 'input_name':

					//if div>heading>h3 already exists
					if(((resumePreview.getElementsByClassName('heading').length)!=0)||((resumePreview.getElementsByTagName('h3').length)!=0)){
						var headingContainer=resumePreview.getElementsByClassName('heading')[0];
						var headerTitle=headingContainer.getElementsByTagName('h3')[0];
						headerTitle.innerHTML=e.target.value;
					}

					//incase div.heading has not been created
					else {
						var headingContainer=document.createElement("div");
						var headerTitle=document.createElement("h3");					
						resumePreview.appendChild(headingContainer);
						headingContainer.appendChild(headerTitle);
						headingContainer.className+="heading";
						//console.log(e.target.value);
						headerTitle.innerHTML=e.target.value;				
					}
					break;

				//when update happens in the 'experience' input					
				case 'input_experience':

					//if h5 element is already present
					if(resumePreview.getElementsByTagName('h5').length!=0){
						var headingContainer=resumePreview.getElementsByClassName('heading')[0];
						var experienceBrief=headingContainer.getElementsByTagName('h5')[0];
						experienceBrief.innerHTML= professionName + ' with ' + e.target.value + ' years of experience';
					}

					//incase div.heading has not been created
					else{
						var headingContainer=resumePreview.getElementsByClassName('heading')[0];
						var headerTitle=headingContainer.getElementsByTagName('h3')[0];
						var experienceBrief=document.createElement("h5");
						headingContainer.insertBefore(experienceBrief, headerTitle.nextSibling);
						experienceBrief.innerHTML=e.target.value;				
					}
					break;

				//when update happens in the 'objective' input
				case 'input_objective':
					
					//if p.objective is already present
					if(resumePreview.getElementsByClassName('objective').length!=0){
						var objective=resumePreview.getElementsByClassName('objective')[0];
						objective.innerHTML=e.target.value;
					}
					else{
						var objective=document.createElement('p');
						resumePreview.appendChild(objective);
						objective.className+='objective';
					}
					break;
			}
		}
	}

	//update skills
	function updateSkills(){
		var actionRemoveSkill, 
		skillsFieldset=document.getElementById('skills'), 
		btnAddSkills=document.getElementById('add_skill'), 
		i=1, skill,
		j;
		var actionRemoveSkill, removeSkillCount;
		btnAddSkills.addEventListener('click', addSkills, false);
		for(j=0;j<skillsFieldset.elements.length;j++){
			skillsFieldset.elements[j].addEventListener("keyup", writeSkills, false);
		}
		function writeSkills(e){
			// console.log(document.getElementById('skillList'));
			if((document.getElementById('skillList'))==null){
				var skillContainer=document.createElement('div');
				var skillUl=document.createElement('ul');
				var skillItemDefault=document.createElement('li');
				skillItemDefault.className+='skillDefault';
				var skillItemDefaultName=document.createElement('span');
				skillItemDefaultName.innerHTML=e.target.value;
				var skillItemDefaultRating=document.createElement('span');
				skillItemDefaultRating.className+='rating';
				skillContainer.id="skillList";
				skillItemDefault.appendChild(skillItemDefaultName);
				skillItemDefault.appendChild(skillItemDefaultRating);
				skillUl.appendChild(skillItemDefault);
				skillContainer.appendChild(skillUl);
				resumePreview.appendChild(skillContainer);
			}
			else{
				skillItemDefaultName.innerHTML=e.target.value;
			}
		}
		function addSkills(e){

			//
			var childLen=skillsFieldset.children.length;
			var lastLabel=skillsFieldset.children[childLen-2];//DOM object of the last label tag, so as to check the value of it
			if((lastLabel.children[0].value=='')||(lastLabel.children[1].value=='default')){
				console.log('no point in adding more skills if you cant fill the values in the existing text inputs fields!');
			}
			else{

				// var labelTextStr='Skill'+(i+1);
				var skillsetlabel=document.createElement('label');
				// var labelText=document.createTextNode(labelTextStr);

				//creating the input element and related attributes
				var inputField=document.createElement('input');
				inputField.id="input_skill"+i;
				inputField.name='skill'+i;
				inputField.type='text';
				inputField.placeholder="Enter skill here";
				// inputField.setAttribute('name', 'skill'+i);
				// inputField.setAttribute('type', 'text');

				//creating the select element, options and related attributes
				var selectField=document.createElement('select');
				var optionDefault= document.createElement('option');
				optionDefault.text="Rate yourself";
				optionDefault.value="default";
				var option1= document.createElement('option');
				option1.text="1";
				option1.value="1";
				var option2= document.createElement('option');
				option2.text="2";
				option2.value="2";
				var option3= document.createElement('option');
				option3.text="3";
				option3.value="3";
				var option4= document.createElement('option');
				option4.text="4";
				option4.value="4";
				var option5= document.createElement('option');
				option5.text="5";
				option5.value="5";
				selectField.appendChild(optionDefault);
				selectField.appendChild(option1);
				selectField.appendChild(option2);
				selectField.appendChild(option3);
				selectField.appendChild(option4);
				selectField.appendChild(option5);

				//creating the 'remove' link
				var removeLink=document.createElement('a');
				var removeLinkText=document.createTextNode('Remove');
				removeLink.appendChild(removeLinkText);
				removeLink.setAttribute('href', '#');
				removeLink.className+='muted';
				removeLink.className+=' removeSkill';
				
				//appending created elements to DOM
				//skillsetlabel.appendChild(labelText);
				skillsetlabel.appendChild(inputField);
				skillsetlabel.appendChild(selectField);
				skillsetlabel.appendChild(removeLink);
				skillsFieldset.insertBefore(skillsetlabel, btnAddSkills);

				//facilitating 'remove' of skillset fields
				actionRemoveSkill=document.getElementsByClassName('removeSkill');
				removeSkillCount=actionRemoveSkill.length;
				for(var c=0;c<removeSkillCount;c++){
					//console.log(actionRemoveSkill[removeSkillCount-1]);
					actionRemoveSkill[removeSkillCount-1].addEventListener('click',removeSkillGroup,false);
				}
				i++;
			}
		}
		function removeSkillGroup(e){
			var removable=e.target.parentNode;
			removable.parentNode.removeChild(removable);//since js doesnt permit suicide of a DOM object, only way to delete a node is going to its parent and removing its child by referring to the dom object to be removed
		}
	}

	//update social media links
	function updateSocialMedia(){

	}

	//calling all functions that updates content to the resume
	updateProfession();
	updateBasicInfo();
	updateSkills();
	updateSocialMedia();	
}

/************************************************************************************************************************/
//On load statements
/************************************************************************************************************************/

window.onload=function(){
	var resumeForm=document.forms["resumeForm"];
	var resumePreview=document.getElementById("resume_preview");
	var professionRadioGroup=document.getElementById("profession_radiogroup");
	formWatchOn(professionRadioGroup, resumeForm, resumePreview);
};