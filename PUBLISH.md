Publishing packages
===
Since `enonic-npm` is a monorepo, all packages should be published using [Lerna](https://github.com/lerna/lerna). It's still possible to publish with `npm` or `yarn`, but it's not recommended.

### Prepare ###

##### npm #####

Check if you are logged in to the npm from terminal:
```shell
npm whoami
```
...and login, if you haven't yet:
```shell
npm login
```

For more information read the [documentation](https://docs.npmjs.com/cli/adduser).

##### Lerna #####

To publish packages with Lerna, you can just run the npm script:

```bash
npm run lernaPublish
```

To use other [commands](https://github.com/lerna/lerna#commands), you may need to install it globally.

### Publish ###

Here are the common steps for changing and publishing your code:

1. Update something in the packages and **commit** your changes;
2. Run `npm run lernaPublish`;
3. Proceed with the steps in the prompt.

### Something went wrong ###

Don't panic! Your problem may have a solution below.

##### Publishing failed #####

If publishing failed on the last step and Lerna already updated `package.json`, created commit with tags, you may want to fix the problem and try again:

```shell
lerna publish --force-publish $(ls packages/)
```

..or remove the tags and commit and start from scratch with two commands:

```shell
git tag -d $(git tag -l --points-at HEAD)

git reset --hard HEAD~1
```

#### Other issues ####

Look at the official Lerna [FAQ](https://github.com/lerna/lerna/blob/master/FAQ.md).
