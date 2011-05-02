exports.regexp = {
    escapeString : function(/*String*/str, /*String?*/except) {
        return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, function(ch) {
            if (except && except.indexOf(ch) != -1) {
                return ch;
            }
            return "\\" + ch;
        }); // String
    }
};