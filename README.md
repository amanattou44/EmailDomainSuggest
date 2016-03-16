# EmailDomainSuggest
email domain autocomplete

## How to install

```sh
bower install --save email-domain-suggest
```

```sh
npm install --save email-domain-suggest browserify
# Use browserify. Please compiled with browserify
```

## Usage

```js
<script src="EmailDomainSuggest.js"></script>

var emailDomainSuggest = EmailDomainSuggest.getInstance(`target-input-form-tag`);
emailDomainSuggest.execute();
```

- options

`EmailDomainSuggest.getinstance('target-input-form-tag', options);`

name       | type         | description
---------- | ------------ | -------
datalistId | String       | Overwrite the existing datalist-ID
addDomain  | Array/String | You want to add completion list

## Any action?
![email-domain-suggest](http://i.giphy.com/lXiRpZoyp25ZMIQNi.gif)

## Support browser

Default browser
- IE10, FF33+, Chrome38+, Opera27+, Android Browser 4.4.4+, Chrome for Android40+

In other words create a datalist tag of HTML5.

