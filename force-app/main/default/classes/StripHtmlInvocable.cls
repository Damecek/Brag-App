public inherited sharing class StripHtmlInvocable {
    @InvocableMethod(Label='Strip HTML tags' Description='Strips HTML tags from a list of strings' Category='Text' IconName='slds:action:new_custom83')
    public static List<String> strip(List<String> htmls) {
        List<String> out = new List<String>();
        for (String html : htmls) {
            out.add(html.stripHtmlTags());
        }
        return out;
    }
}