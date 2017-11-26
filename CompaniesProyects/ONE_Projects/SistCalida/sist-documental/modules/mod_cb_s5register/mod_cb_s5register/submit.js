<!--//--><![CDATA[//><!--
var cbDefaultFieldBackground;
function submitbutton(mfrm) {
	var me = mfrm.elements;
	var r = new RegExp("[\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-]", "i");
	var errorMSG = '';
	var iserror=0;
	if (cbDefaultFieldBackground === undefined) cbDefaultFieldBackground = ((me['username'].style.getPropertyValue) ? me['username'].style.getPropertyValue("backgroundColor") : me['username'].style.backgroundColor);
	if (me['username'].value == "") {
		errorMSG += "Please enter a User name.\n";
		me['username'].style.backgroundColor = "red";
		iserror=1;
	} else if (r.exec(me['username'].value) || (me['username'].value.length < 3)) {
		errorMSG += "Please enter a valid Username:.  No spaces, more than 2 characters and contain 0-9,a-z,A-Z\n";
		me['username'].style.backgroundColor = "red";
		iserror=1;
	} else if (me['username'].style.backgroundColor.slice(0,3)=="red") { me['username'].style.backgroundColor = cbDefaultFieldBackground;
	} if (r.exec(me['password'].value) || (me['password'].value.length < 6)) {
		errorMSG += "Please enter a valid Password:.  No spaces, more than 6 characters and contain 0-9,a-z,A-Z\n";
		me['password'].style.backgroundColor = "red";
		iserror=1;
	} else if ((me['password'].value != "") && (me['password'].value != me['verifyPass'].value)){
		errorMSG += "Password and verification do not match, please try again.\n";
		me['password'].style.backgroundColor = "red"; me['verifyPass'].style.backgroundColor = "red";
		iserror=1;
	} else {
		if (me['password'].style.backgroundColor.slice(0,3)=="red") me['password'].style.backgroundColor = cbDefaultFieldBackground;
		if (me['verifyPass'].style.backgroundColor.slice(0,3)=="red") me['verifyPass'].style.backgroundColor = cbDefaultFieldBackground;
	}
	
	if(!me['acceptedterms'].checked) {
		errorMSG += "You must accept the Terms and Conditions before registering!\n";
		iserror=1;
	}

	// loop through all input elements in form
	for (var i=0; i < me.length; i++) {
		// check if element is mandatory; here mosReq="1"
		if ( (typeof(me[i].getAttribute('mosReq')) != "undefined") && ( me[i].getAttribute('mosReq') == 1) ) {
			if (me[i].type == 'radio' || me[i].type == 'checkbox') {
				var rOptions = me[me[i].getAttribute('name')];
				var rChecked = 0;
				if(rOptions.length > 1) {
					for (var r=0; r < rOptions.length; r++) {
						if (rOptions[r].checked) {
							rChecked=1;
						}
					}
				} else {
					if (me[i].checked) {
						rChecked=1;
					}
				}
				if(rChecked==0) {
					// add up all error messages
					errorMSG += me[i].getAttribute('mosLabel') + ' : This field is required!\n';
					// notify user by changing background color, in this case to red
					me[i].style.backgroundColor = "red";
					iserror=1;
				} else if (me[i].style.backgroundColor.slice(0,3)=="red") me[i].style.backgroundColor = cbDefaultFieldBackground;
			}
			if (me[i].value == '') {
				// add up all error messages
				errorMSG += me[i].getAttribute('mosLabel') + ' : This field is required!\n';
				// notify user by changing background color, in this case to red
				me[i].style.backgroundColor = "red";
				iserror=1;
			} else if (me[i].style.backgroundColor.slice(0,3)=="red") me[i].style.backgroundColor = cbDefaultFieldBackground;
		}
	}
	if(iserror==1) {
		alert(errorMSG);
		return false;
	} else {
		return true;
	}
}

//--><!]]>