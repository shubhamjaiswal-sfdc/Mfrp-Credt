({
    doInit : function(component, event, helper) {
        var spinner = component.find("spinner");
        $A.util.removeClass(spinner, "slds-hide");
        
        var action = component.get("c.fetchUser");       
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var userValue = response.getReturnValue();
                component.set("v.ownId", userValue.ContactId);
                
                var action2 = component.get("c.fetchFiles");	        	        
                action2.setParams({	            
                    "linkedRecId" : component.get("v.ownId")	        
                });	        	       
                action2.setCallback(this,function(response){	            
                    var state = response.getState();	            
                    if(state == "SUCCESS"){	                
                        var result = response.getReturnValue()	               
                        component.set("v.filesIds",result);	            
                    }	        
                });	        
                $A.enqueueAction(action2);
                
                spinner = component.find("spinner");
                $A.util.addClass(spinner, "slds-hide");
            }
        });
        $A.enqueueAction(action);
    }
})