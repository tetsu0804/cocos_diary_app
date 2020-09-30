module.exports = {
  'Demo test ecosia.org' : function(browser) {
    browser
      // .url('http://localhost:5000/')
      // .waitForElementVisible('body')
      // .click('.login-signup-btn')
      // .setValue('#signup-input-1', '早坂')
      // .setValue('#signup-input-2', '絵理子')
      // .setValue('#signup-input-3', 'hayasaka8@test.com')
      // .setValue('#signup-input-4', 'password')
      // .setValue('#signup-input-5', 'password')
      // .click('#signup-btn')
      // // .click('#signup-btn', function (result) {
      // //   browser.pause(3000);
      // // })
      // .pause(5000)
      // .assert.containsText('#header_user_name', '絵理子')
      // .assert.containsText('#header_logout', 'ログアウト')


        // .assert.visible('#msg_title', 'タイトルは:スラムダンク')
        // .assert.visible('#msg_email', 'emailは:test@test.com')
        // .assert.visible('#msg_text', 'テキストは:バスケ漫画')
      //console.log(browser)
      // .assert.titleContains('Ecosia')
      // .assert.visible('input[type=search]')
      // .setValue('input[type=search]', 'nightwatch')
      // .assert.visible('button[type=submit]')
      // .click('button[type=submit]')
      // .assert.containsText('.mainline-results', 'Nightwatch.js')
      //.assert.containsText('p', 'Hello Vue!')
      //.end();
  },

  'login成功': function(browser) {
    browser
      .url('http://localhost:5000/#/login')
      .setValue('#login-input-1', 'test@test.com')
      .setValue('#login-input-2', 'password')
      .click('.login-login-btn')
      .assert.elementPresent('#header_user_name')
      .click('#header_logout')
      .assert.elementPresent('#login-text-title')
      .end()
  },

  'login失敗': function(browser) {
    browser
      .url('http://localhost:5000/#/login')
      .setValue('#login-input-1', '登録していないemail@test.com')
      .setValue('#login-input-2', 'tourokusiteinai')
      .click('.login-login-btn', function(result){
        browser.assert.urlEquals('http://localhost:5000/#/login')
      })
      .end()
    },

    'ブログ作成': function(browser) {
      browser
        .url('http://localhost:5000/')
        .setValue('#login-input-1', 'test@test.com')
        .setValue('#login-input-2', 'password')
        .click('.login-login-btn')
        .pause(3000)
        .click('#header-blog-make')
        .setValue('#blog-new-input-1', 'ここちゃん大好き')
        .setValue('#blog-new-input-2', 'ソファの上でずっとソファを舐めている')
        .click('.blog-new-btn')
        .pause(3000)
        .assert.elementPresent('#home-blogs')
        .assert.containsText('.home-btn', 'ここちゃん大好き')
        .click('#header_logout')
        .end()
    },
    'ブログ編集': function(browser) {
      browser
        .url('http://localhost:5000/')
        .setValue('#login-input-1', 'test@test.com')
        .setValue('#login-input-2', 'password')
        .click('.login-login-btn')
        .pause(3000)
        .click('.home-btn', function(result) {
          console.log(result)
        })
        .pause(5000)
        .click('#blog-edit-btn')
        .clearValue('#blog-edit-input-1')
        .pause(3000)
        .setValue('#blog-edit-input-1', '編集したよここちゃん')
        .setValue('#blog-edit-input-2', '編集してもずっとソファを舐めてるね')
        .click('.blog-edit-finish-btn', function(result) {
        })
        .pause(3000)
        .assert.containsText('.home-btn', '編集したよここちゃん')
        .end()
    }
};
