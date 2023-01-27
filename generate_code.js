function select_data() {
    const formData = {
        sex: document.querySelector('input[name="sex"]:checked').value,
        vorname: document.getElementById("vorname").value,
        name: document.getElementById("name").value,
        strasse: document.getElementById("strasse").value,
        ort: document.getElementById("ort").value,
        statusorig: document.getElementById("statusorig").value,
        matnr: document.getElementById("matnr").value,
        email: document.getElementById("email").value,
        telefon: document.getElementById("telefon").value,
        newsletter: document.querySelector('input[name="newsletter"]:checked').value,
        iban: document.getElementById("iban").value,
        kontoinh: document.getElementById("kontoinh").value
    };
    return formData;
}

buchung_button = document.getElementById("generate_buchung");
buchung_button.addEventListener("click",
    function(e){
        e.preventDefault();
        // Read formular input
        formData = select_data();
        let code = "javascript:(function(){\n";
        // fill form
        for(var key in formData) {
            if(key != "iban" && key != "kontoinh") {
                //these are only required for the sportscard
                inputField = document.querySelector('[name="' + key + '"]');
                if(inputField.type == "radio") {
                    code += "\tdocument.querySelector('[name=\"" + key + "\"][value=\"" + formData[key] + "\"]').checked = true\;\n";
                } else if(inputField.type == "text") {
                    code += "\tdocument.querySelector('[name=\"" + key + "\"]').value=\"" + formData[key] + "\"\;\n";
                } else if(inputField.type == "select-one") {
                    code += "\tdocument.querySelector('[name=\"" + key + "\"]').value=\"" + formData[key] + "\"\;\n";
                }
                if(key == "statusorig") {
                    //trigger event usually triggered by selecting the status
                    code += "\tchgStatus();\n"
                }
            }           
        }
        
        //check chechbox
        code += "\tdocument.querySelector('[name=\"tnbed\"]').checked = true\;\n";
        code += "})();"
        //add code output to textbox
        document.getElementById("code_buchung").value=code;
    }
, false);

sportscard_button = document.getElementById("generate_sportscard");
sportscard_button.addEventListener("click",
    function(e){
        e.preventDefault();
        // Read formular input
        formData = select_data();
        let code = "javascript:(function(){\n";
        // fill form
        for(var key in formData) {
            inputField = document.querySelector('[name="' + key + '"]');
            if(inputField.type == "radio") {
                code += "\tdocument.querySelector('[name=\"" + key + "\"][value=\"" + formData[key] + "\"]').checked = true\;\n";
            } else if(inputField.type == "text") {
                code += "\tdocument.querySelector('[name=\"" + key + "\"]').value=\"" + formData[key] + "\"\;\n";
            } else if(inputField.type == "select-one") {
                code += "\tdocument.querySelector('[name=\"" + key + "\"]').value=\"" + formData[key] + "\"\;\n";
            }    
            if(key == "statusorig") {
                //trigger event usually triggered by selecting the status
                code += "\tchgStatus();\n"
            }
        }

        //check chechbox
        code += "\tdocument.querySelector('[name=\"tnbed\"]').checked = true\;\n";
        code += "})();"
        //add code output to textbox
        document.getElementById("code_sportscard").value=code;
    }
, false);