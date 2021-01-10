({
    doInit : function(component, event, helper) {
        
        component.set('v.appName', 'Application for New Credit Card');
        var today = new Date();
        var dd = String(today.getDate() +10).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        component.set('v.confDate', today);
        
        var spinner = component.find("spinner");
        $A.util.removeClass(spinner, "slds-hide");
        
        var action = component.get("c.fetchUser");       
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var userValue = response.getReturnValue();
                component.set("v.ownId", userValue.ContactId);
                spinner = component.find("spinner");
                $A.util.addClass(spinner, "slds-hide");
            }
        });
        $A.enqueueAction(action);
    },
    handleCheck : function(component, event, helper) {
        let recordId = component.get('v.ownId');
        console.log("rec ID: " + recordId)
        let navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId" : recordId 
        });
        navEvt.fire();
    },
    
    handleUploadFinished: function (cmp, event) {
        var uploadedFiles = event.getParam("files");
        alert("Uploading successfully!!! Files uploaded : " + uploadedFiles.length);
        
        uploadedFiles.forEach(file => console.log(file.name));
    },
    
    handleSubmit: function(component, event, helper) {
        
        var action = component.get("c.submitOpp");
        action.setParams({
            "newName" : component.get('v.appName'),
            "newOwner" : component.get('v.ownId'),
            "cardOwner" : component.get('v.ownName'),
            "newEmail" : component.get('v.email'),
            "newPhone" : component.get('v.mobile'),
            "newEmpType" : component.get('v.empType'),
            "newLimit" : component.get('v.limit'),
            "newExpDate" : component.get('v.confDate')
        })
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var oppId = response.getReturnValue();
                console.log("oppId : " + oppId);
                if(oppId){
                    component.set("v.returnedValue", oppId);
                    component.set("v.visible",false);
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    viewAttachment : function(component, event, helper){
        component.set("v.visible",false);
    }
})