# save-secret GitHub Actions
This GitHub Action can be used to create or update a secret in a repository or an environment.

#### Disclaimer
> :warning: **Save organisation secret is experimental:** In this repository there is an action that can be used to set or update organization-secrets. However, this action is untested and can lead to unexpected errors when used. Therefore, use it at your own risk.

***

# Inputs
**`token:`** A token with write privileges to repository secrets. The default way is to use the token provided by GitHub with `${{ secrets.GITHUB_TOKEN }}`. You can also use your own personal access token.

**`githubApi:`** *Optional* The default api used by this action is `https://api.github.com`. However, if you use GitHub Enterprise, this api will probably differ. In this case, it is easiest to use `${{ github.api_url }}`.

**`repository:`** The owner and the name of the repository must be entered here in the style `{OWNER}/{REPO}`. The default way is to use `${{ github.repository }}`.

**`secret:`** This input represents the secret value you want to store in your repository secrets.

**`secretName:`** This will be the name under which your secret will be stored.

***

# How to use
## for repository secrets

on default GitHub-API:

    - name: 'Save repository-secret'
      uses: tobiwein/save-secret/repository@v0.2
      with:
        token: ${{ secrets.GITHUB_TOKEN }}
        repository: ${{ github.repository }}
        secret: 'secret value'
        secretName: 'my_secret'

on GitHub Enterprise:


    - name: 'Save repository-secret in GHE'
      uses: tobiwein/save-secret/repository@v0.2
      with:
        token: ${{ secrets.GITHUB_TOKEN }}
        githubApi: ${{ github.api_url }}
        repository: ${{ github.repository }}
        secret: 'secret value'
        secretName: 'my_secret'

## for environment secrets

### To save a secret in an environment, an additional secret is required:

**`environment:`** This field represents the the Name of the environment you want to store your secret in. It is not case sensitive.

on default GitHub-API:

    - name: 'Save environment-secret'
      uses: tobiwein/save-secret/environment@v0.2
      with:
        token: ${{ secrets.GITHUB_TOKEN }}
        repository: ${{ github.repository }}
        environment: 'My environment'
        secret: 'secret value'
        secretName: 'my_secret'

on GitHub Enterprise:

    - name: 'Save environment-secret on GHE'
      uses: tobiwein/save-secret/environment@v0.2
      with:
        token: ${{ secrets.GITHUB_TOKEN }}
        githubApi: ${{ github.api_url }}
        repository: ${{ github.repository }}
        environment: 'My environment'
        secret: 'secret value'
        secretName: 'my_secret'

## for organisation secrets

> :warning: **Experimental, as explained above**

    - name: 'Save organisation secret'
      uses: tobiwein/save-secret/organisation@v0.3
      with:
        token: ${{ secrets.GITHUB_TOKEN }}
        organisation: ${{ github.repository_owner }}
        secret: 'secret value'
        secretName: 'my_secret'
