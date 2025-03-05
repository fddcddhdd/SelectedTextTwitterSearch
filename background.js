chrome.contextMenus.create({
    "title": "Twitterで「%s」を検索",
    "type": "normal",
    "contexts": ["selection"],
    "onclick": function(info) {
        
        // 全角スペース・半角スペースを含んでいなければ、ダブルクオーテーションで囲む
        var selected_text =  info.selectionText;                
        if ( !selected_text.match(/[ 　]/)) {
            selected_text =  '"' + selected_text + '"';
        }
        
        // アクティブなタブ情報を取得
        chrome.tabs.getSelected(null, function(tab) {      
            // Google以外のページだったら、Google検索もする  
            var google_url = tab.url.match(/^https:\/\/www\.google\.co\.jp.+$/);    
            if(google_url == null){    
                chrome.tabs.create({
                    url: 'https://www.google.co.jp/search?q='+encodeURIComponent(selected_text)
                }); 
            }          
            
            // twitter(すべてのツイート)
            chrome.tabs.create({
                url: 'http://twitter.com/search?f=tweets&q='+encodeURIComponent(selected_text)
            });            
        });  
     
    }
});