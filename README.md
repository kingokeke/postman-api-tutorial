# Express API Demo Application for our Postman Article

An Express API built to access from the Postman client while following our Postman article.

## Clone the Express API Demo Application

```bash
git clone https://github.com/lukeoliff/auth0-postman-express.git
```

Change into your demo app directory.

```bash
cd auth0-postman-express
```

Make sure you run `npm install` to pull down all our node dependencies.

```bash
npm install
```

### Connect to Our Demo Database

Create a new `.env` file from our existing `.env.example`. It already contains the demo connection details required to connect to our database.

```bash
cp .env.example .env
```

You could [install and connect to a local MongoDB as well](https://docs.mongodb.com/manual/administration/install-community/). As the data is modelled all you would need to do is create a database and change the connection string in the `.env` file.

## Authorization in Postman

![Auth0 login screen](https://cdn.auth0.com/blog/manage-postman/authorization.png)

### Sign Up for Auth0

You'll need an [Auth0](https://auth0.com) account to manage authentication. You can [sign up for a free Auth0 account here](https://auth0.com/signup). Next, set up an Auth0 Client and API so Auth0 can interface with your app and API.

### Set Up an Auth0 Application

1. Go to your [**Auth0 Dashboard**](https://manage.auth0.com/#/) and click the "[Create Application](https://manage.auth0.com/#/applications/create)" button.
2. Name your new app, select "Regular Web App" and click the "Create" button.
3. In the **Settings** for your new Auth0 app, add `https://www.getpostman.com/oauth2/callback` to the **Allowed Callback URLs**.
4. Click the "Save Changes" button.

### Set Up an Auth0 API

1. Go to [**APIs**](https://manage.auth0.com/#/apis) in your dashboard and click on the "Create API" button.
2. Enter a name for the API. Set the **Identifier** to your API's URL. In this example, this is `http://express-api/`. It doesn't need to be a live web address, it just needs to be unique for this API. The **Signing Algorithm** should be `RS256`.

### Get an Access Token in Postman

Before Postman can get an access token for you, there are some configuration you need to do and some information you need from the Auth0 application and API you've just created. These details can be found on your [**Auth0 Dashboard**](https://manage.auth0.com/#/). 

Open your new Application found on your [**Auth0 Applications**](https://manage.auth0.com/#/applications) page for the following details.

 - `auth0_domain`: Copy from the **Domain** field.
 - `auth0_client_id`: Copy from the **Client ID** field.
 - `auth0_client_secret`: Copy from the **Client Secret** field.

The API audience you need can be found on your [**Auth0 APIs**](https://manage.auth0.com/#/apis) page. Open your new API for the following details.

 - `auth0_audience`: Copy from the **Identifier** field, (NOT **ID** field). Our example was `http://express-api/`.

Add these details to the Postman environment you created to store reusable [environment variables](https://www.getpostman.com/docs/v6/postman/environments_and_globals/variables).

![Auth0 environment variables](https://cdn.auth0.com/blog/manage-postman/auth0-environment-variables.png)

Now, edit your Postman collection.

![Edit your Postman collection](https://cdn.auth0.com/blog/manage-postman/edit-collection.png)

Click on the *Authorization* tab. For ***Type*** pick `OAuth 2.0` and for ***Add auth data to*** pick `Request Headers`.

![Select OAuth 2.0 and Request Headers](https://cdn.auth0.com/blog/manage-postman/request-headers.png)

Now click on *Get New Access Token* and complete the form shown here.

> ***Note:*** Postman [doesn’t support an audience](https://github.com/postmanlabs/postman-app-support/issues/2934), so we need to append it to our authorize endpoint.

| Form Field                | Value                                                                      |
|---------------------------|----------------------------------------------------------------------------|
| **Token Name**            | `Any name you like`                                                        |
| **Grant Type**            | `Authorization Code`                                                       |
| **Callback URL**          | `https://www.getpostman.com/oauth2/callback`                               |
| **Auth URL**              | `https://{{auth0_domain}}/authorize?audience={{auth0_audience}}`           |
| **Access Token URL**      | `https://{{auth0_domain}}/oauth/token`                                     |
| **Client ID**             | `{{auth0_client_id}}`                                                      |
| **Client Secret**         | `{{auth0_client_secret}}`                                                  |
| **Scope**                 | `openid profile email`                                                     |
| **State**                 | `Some random string of your choosing`                                      |
| **Client Authentication** | `Send client credentials in body`                                          |

![Complete the token request form](https://cdn.auth0.com/blog/manage-postman/request-form.png)

Now click on **Request Token** and log in (or sign-up) to your application.

![Auth0 login screen](https://cdn.auth0.com/blog/manage-postman/authorization.png)

On successful login, you'll see a new access token. Scroll down and click on **Use Token**.

![Receive and use the access token](https://cdn.auth0.com/blog/manage-postman/access-token.png)

Your collection edit screen will now have the correct access token selected, but if it doesn't, click on the **Available Tokens** drop-down and select the correct one. Click on **Update**.

![Select the right access token](https://cdn.auth0.com/blog/manage-postman/token-selected.png)

This has now updated the collection (or request, if you edited authorization there) with the appropriate `Authorization=Bearer <an_access_token_here>` header, which you'll see on the **Header** tab of your requests.

### Access Token to Call Protected Endpoints

All your saved requests will default to Authorization Type **Inherit auth from parent**. You can see this on the **Authorization** tab of your requests. In this case, your requests will inherit from the collection. But, you can also organise your requests into folders and configure Authorization Type at a folder level.

This is where you could also choose to add Authorization to your individual requests.

![Select inherit auth from parent](https://cdn.auth0.com/blog/manage-postman/inherit-auth-from-parent.png)

Now you have an access token, you need to make a small change to our application so it can verify our access. Update your `.env` file so the `AUTH0_DOMAIN` and `AUTH0_AUDIENCE` are the same as the values you just added to your Postman Environment above.

```dotenv
MONGO=mongodb://demo:password1@ds163103.mlab.com:63103/auth0-postman-express
DEBUG=auth0-postman-express:*
AUTH0_DOMAIN=your-auth0-domain.auth0.com
AUTH0_AUDIENCE=http://express-api/
```

Once modified, run the API again using the same `start` script from before.

```bash
npm start
```

Now our API will be able to verify our token.