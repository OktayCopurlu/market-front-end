1 - access orijin hatası alındı, bu cors ile çözüldü
    app.use(cors()) ile çözüldü

2 - databaseye image gönderirlen problem oluştu, image yapısı buffer olması gerekiyor, fakat npm buffer kaldırılmış.
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function(e) {
    setSelectedFiles(e.target.result);

3 - Error :TypeError: Failed to execute 'fetch' on 'Window': Invalid name fetch

    header içerisinde syntax hatası ".." tırnak unutulmuş

4 - (event.target.className || "").indexOf is not a function at onDoubleClick (eval at success (kernel.js:1), <anonymous>:62:48)

    google chorme deki meta eklentisinden kaynaklanan sorun. eklenti kaldırıldı ve sorun çözüldü.

-------------------------------------------------------------------------------------
5 - after click search icon - input should be cleared

6- after create or edit product isSuccess state should be null in 30 second or whenever

7- in edit product user doesn't have to upload images again
