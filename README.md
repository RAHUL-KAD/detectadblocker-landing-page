# [imgai](https://imgai.netlify.app/)



[![Face Photo Restorer](./public/silueta.png)](https://imgai.netlify.app/)


## Running Locally

### Cloning the repository the local machine.

```bash
git clone
```


### Storing API key in .env file.

Create a file in root directory of project with env. And store your API key in it, as shown in the .example.env file.


If you'd also like to do rate limiting, create an account on UpStash, create a Redis database, and populate the two environment variables in `.env` as well. If you don't want to do rate limiting, you don't need to make any changes.

### Installing the dependencies.

```bash
npm install
```

### Running the application.

Then, run the application in the command line and it will be available at `http://localhost:3000`.

```bash
npm run dev
```