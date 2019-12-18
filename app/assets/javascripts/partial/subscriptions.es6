this.App.subscriptions = function() {
    var section_subject = App.scripts.home_page.section_subject;
    section_subject.subscribe(App.scripts.mobile_navigation.api.update_links);
    section_subject.subscribe(App.scripts.navigation.api.update_links);
    
}