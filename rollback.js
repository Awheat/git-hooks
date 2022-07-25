// 资料
// https://blog.csdn.net/qq_39657585/article/details/102877239
// http://www.javascriptcn.com/post/51796
const simpleGit = require('simple-git');

const git = simpleGit('./');

const init = async () => {
    // console.log('---git---', git);
    // const res = await git.checkoutBranch('dev');
    // console.log('---res---', res);
    //const status = await git.status();
    // console.log('---status---', status);

    //----下面是通过的----

    // await git.status();

    // await git.add('./*');

    // await git.commit('测试111');

    // const a = await git.pull('origin', 'dev1.0');

    // console.log('---aa---', a);

    // const b = await git.push('origin', 'dev1.0');

    // console.log('---bb---', b);

    try {
        await git.checkout(['-b', 'dev1.1']);
    } catch (err) {
        console.log('--err--', err)
    }

    const mergeRes = await git.mergeFromTo('origin/dev1.0', 'dev1.1');

    console.log('--111--', mergeRes);

}

init();