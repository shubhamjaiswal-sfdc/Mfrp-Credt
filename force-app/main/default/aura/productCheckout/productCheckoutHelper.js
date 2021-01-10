({
    
    createTransaction : function(component){
        component.set("v.isOpen",false);
        this.showSuccessToast();
    },
    
    showSuccessToast : function(){
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            
            title: "Hurray!",
            message: " Your Product is Booked Successfully \n Your Product will be delivered within 9 Days \n Have a Good day",
            mode: "pester",
            type: "success",
            duration: "5300"
        });
        toastEvent.fire();
    }
})