const simpleGit = require('simple-git');

const git = simpleGit('./');

const init = async () => {
    // console.log('---git---', git);
    // const res = await git.checkoutBranch('dev');
    // console.log('---res---', res);
    //const status = await git.status();
    // console.log('---status---', status);

    await git.status();

    await git.add('./*');

    await git.commit('测试111');


}

init();