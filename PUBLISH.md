Publish
===
Since `enonic-npm` is a monorepo, all packages must be published using [Lerna](https://github.com/lerna/lerna).

#### Initial setup ####
To use Lerna, install it globally:
```bash
npm install --global lerna
```
There is also an npm script for thatm so just run the following script, if you don't need other commands:
```bash
npm run lernaPublish
```

#### Publishing ####

Here are the common steps for changing and publishing your code:

1. Update something in the packages and **commit** your changes;
2. Run `lerna publish`;
3. Proceed with the steps in the prompt.

#### What if something went wrong? ####

Don't panic! Your problem may have a solution below.

##### Publishing failed #####

If publishing failed on the last step and Lerna already updated `package.json`, created commit with tags, do the following:

1. Remove the newly created tags with:
```bash
git tag -d $(git tag -l --points-at HEAD)
```
2. Remove the commit:
```bash
git reset --hard HEAD~1
```
3. Try it again, considering the error.

#### Other issues ####

Look at the official Lerna [FAQ](https://github.com/lerna/lerna/blob/master/FAQ.md).
