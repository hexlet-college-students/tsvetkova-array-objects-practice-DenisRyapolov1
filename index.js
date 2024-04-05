function convertToObject(content) {
  const [keys, ...apps] = content.trim().split('\n');
  const keysList = keys.split(';').map((key) => (key.startsWith('downloads') ? key.split('_').at(-1) : key.split('_')[0]));
  const appsList = apps.reduce((acc, messenger) => {
    const data = messenger.split(';');
    acc.push(data.reduce((acc2, value, i) => {
      acc2[keysList[i]] = parseFloat(value, 10) || value;
      return acc2;
    }, {}));
    return acc;
  }, []);
  return appsList;
}

const getTopMessenger = (data) => data.reduce((
  top,
  {
    name, developer, playmarket, appstore,
  },
) => (top.at(-1) < playmarket + appstore ? [name, developer, playmarket + appstore] : top), ['', '', 0]);

const getMaxInIndia = (data) => data.reduce((mx, { India }) => Math.max(mx, India), 0);

const getMinInIndia = (data) => data.reduce((mn, { India }) => Math.min(mn, India), Infinity);

const compare = (a, b) => {
  if (a[0] > b[0]) {
    return -1;
  } if (a[0] === b[0]) {
    return 0;
  }
  return 1;
};

const getAustralia = (data) => {
  const temp = data.map(({ name, Australia }) => [Australia, name]).sort(compare);
  return temp.slice(0, 3).map(([, name]) => name).sort();
};

const getAvgTop = (data) => {
  const temp = data.map(({
    name, Russia, Australia, India, England,
  }) => [Russia + Australia + India + England, name]).sort(compare).reverse();
  return temp.map(([, name]) => name);
};

const compareTask5 = (a, b) => (a[1] > b[1] ? -1 : a[b[1] === 1 ? 0 : 1]);

const getDeveloper = (data) => {
  const temp = data.map(({ developer }) => developer);
  const obj = temp.reduce((objDev, dev) => {
    objDev[dev] = (objDev[dev] || 0) + 1;
    return objDev;
  }, {});
  return Object.entries(obj).sort(compareTask5).at(0);
};

// const getLoad = (str) => parseInt(str.split(';').at(6), 10);

// function getDownload(data) {
//     const download = data.map((data) => getLoad(data));
//     return [Math.max(...download), Math.min(...download)];
// };

// const getTop = (str) => [parseInt(str.split(';').at(5), 10), str.split(';').at(0)];

// function getTopOfAustralia(data) {
//     const top = data.map((item) => getTop(item))
//     const top2 = top.slice(0, 3).map(item => item[1])
//     return top2.sort(compare)
// }

// const getDown = (str) => str.split(';').slice(4, 8).map(Number);

// function getTopDownloads(data) {
//     const topD = data.map((item) => getDown(item));
//     const rowSums = topD.map(row => row.reduce((acc, curr) => acc + curr, 0));
//     return rowSums;
// }

const words = ['React', 'Angular', 'Vue.js', 'JQuery', 'Backbone.js', 'Node.js', 'Ember.js', 'Meteor'];

function getFio(data) {
  return data.split('\n').slice(0, 2).join(', ');
}

function getStack(content) {
  const [,,,,, stack,,] = content.trim().split('\n');

  function getListOfStack(data) {
    const listOfStack = data.toLowerCase().split(',');
    return listOfStack;
  }

  return getListOfStack(stack);
}

function getStackList(data) {
  const count = data.reduce((acc, stackItem) => {
    const matches = words.filter((word) => stackItem.includes(word.toLowerCase())).length;
    return acc + matches;
  }, 0);

  return count;
}

function isGitName(names) {
  const [,,,, name,,,] = names.trim().split('\n');
  return name.split(' github.com/')[1];
}

// task 1
const tableParsing = (content) => {
  const data = convertToObject(content);
  const [name, developer] = getTopMessenger(data);
  console.log(`General top messenger: ${name}, Owner: ${developer}`);
  const [mxInd, mnInd] = [getMaxInIndia(data), getMinInIndia(data)];
  console.log(`Download count: Max count: ${mxInd}, Min count: ${mnInd}`);
  const getTopAustralia = getAustralia(data);
  console.log(`Top-3 Australia: ${getTopAustralia.join(', ')}`);
  const getAvgg = getAvgTop(data);
  console.log(`Top downloads: ${getAvgg.join(', ')}`);
  const [name1] = getDeveloper(data);
  console.log(`Top owner: ${name1}`);

  // const [MxDown, MnDown] = getDownload(data);
  // console.log(`Download count: Max count: ${MxDown}, Min count: ${MnDown}`)
  // const getTopik = getTopOfAustralia(data);
  // console.log(`Top-3 Australia: ${getTopik.join(', ')}`)
  // const getDownloads = getTopDownloads(data);
  // console.log(`Top downloads: ${getDownloads}`)
};

// task 2
const candidateAssessment = (content) => {
  const sum = getFio(content);
  console.log(`Job seeker: ${sum}`);
  const staks = getStack(content);
  const finalochka = getStackList(staks);
  console.log(`Required stack: ${finalochka}`);
  const isName = isGitName(content);
  console.log(`GitHub nickname: ${isName.split(',')[0]}`);
};

// task 3
const actorRating = (/* content */) => {

};

export { tableParsing, candidateAssessment, actorRating };
// parth
