({
    
    createTransaction : function(component){
        component.set("v.isOpen",false);
        this.showSuccessToast();
    },
    
    showSuccessToast : function(){
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            
            title: "WooHoo!",
            message: " Your Offer was Redeemed Successfully !!! \n It will reflect shortly in your profile",
            mode: "pester",
            type: "success",
            duration: "3300"
        });
        toastEvent.fire();
    },
    
    showErrorToast : function(){
        let toastEvt = $A.get("e.force:showToast");
        toastEvt.setParams({
            
            title: "Oops!",
            message: "Insufficient CREDT Points",
            mode: "pester",
            type: "error",
            duration: "3300"
        });
        toastEvt.fire();
    }
       
})