({
    doInit : function(component, event, helper) {
        var spinner = component.find("spinner");
        $A.util.removeClass(spinner, "slds-hide");

		var conId = component.get("v.contactID");
        var action = component.get("c.getTransactions");
        action.setParams({
            'contactId' : conId
        });
        action.setCallback(this, function(response){            
            if(response.getState()=='SUCCESS'){  
                component.set('v.transactions',response.getReturnValue());
                spinner = component.find("spinner");
                $A.util.addClass(spinner, "slds-hide");
            }
        });
        $A.enqueueAction(action);
	},
    onMouseOver: function(component, event, helper) {
        // find the current element (column source) by event 
        var eventGetSource = event.getSource();
        // get the field actual value which is store in title, 
        var eventSourceVal = eventGetSource.get("v.title");
        var last5="XXXX-XXXX-XXXX-" + eventSourceVal.substr(-4); 
        // set the value of column with title on mouse over  
        eventGetSource.set("v.value", last5);
        
    },
 
    // hide data value on mouse out in table column
    onMouseOut: function(component, event, helper) {
        // find the current element (column source) by event 
        var eventGetSource = event.getSource();
        //mask or hide data again on mouse out with ****..
        eventGetSource.set("v.value", '********************');
    },
    
    navigate : function(component,event,helper){
        let recordId = event.target.dataset.id;
        console.log("rec ID: " + recordId)
        let navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId" : recordId 
        });
        navEvt.fire();
    }
})