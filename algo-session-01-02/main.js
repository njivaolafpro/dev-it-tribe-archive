const fileList = [
    "3way_BTN_in BBvBTN_MR 15",
    "3way_BTN_in BBvBTN_MR_SB3Betsize 25"
    ,"3way_BTN_in BBvBTN_MR_SBShove 11",
    "3way_BTN_in BBvBTN_MR_SBShove 17",
    "3way_BTN_in BBvBTN_MR_SBShove 23",
    "3way_BTN_in BBvBTN_OS 13","3way_BTN_in BBvBTN_OS 17","3way_BTN_in BTN 11",
    "3way_BTN_in BTN 19","3way_BTN_in BTN 23","3way_BTN_in BTNv3BetsizeBB 21",
    "3way_BTN_in BTNv3BetsizeSB 21","3way_BTN_in BTNvBB_Shove 15","3way_BTN_in BTNvBB_Shove 23",
    "3way_BTN_in BTNvSB_Shove 15","3way_BTN_in BTNvSB_Shove 25","3way_BTN_in BTNvSB_ShoveandBB_Reshove 13",
    "3way_BTN_in BTNvSB_ShoveandBB_Reshove 21","3way_BTN_in SBvBTN_MR 15",
    "3way_BTN_in SBvBTN_MR 23","3way_BTN_in SBvBTN_OS 13","3way_BvB BBvSB_L 13",
    "3way_BvB BBvSB_LimpShove 13","3way_BvB BBvSB_LimpShove 21",
    "3way_BvB BBvSB_LimpShove 23","3way_BvB BBvSB_OS 13","3way_BvB BBvSB_OS 21",
    "3way_BvB BBvSB_R 13","3way_BvB BBvSB_R 17","3way_BvB SB 11","3way_BvB SB 23",
    "3way_BvB SBv1tierStack 13","3way_BvB SBv1tierStack 23","3way_BvB SBv3BetShove 17",
    "3way_BvB SBv3betSize 23","3way_BvB SBvISO_AI 13","3way_BvB SBvISO_AI 23",
    "3way_BvB SBvISO_NAI 17","3way_BvB SBvISO_NAI 23","3way_BvB SBvISO_NAI 9",
    "HU HU_BBvLSB 13","HU HU_BBvLSB 9","HU HU_BBvMRSB 14","HU HU_BBvMRSB 23",
    "HU HU_BBvOS 16","HU HU_RSBvRS 23","HU HU_SB 13","HU HU_SB 23","HU HU_SB 8",
    "HU HU_SBv1tierStack 9","HU HU_SBvISO_AI 10","HU HU_SBvISO_AI 18",
    "HU HU_SBvISO_AI 8","HU HU_SBvISO_NAI 12","HU HU_SBvISO_NAI 18",
    "HU HU_SBvISO_NAI 23",
];

const parseFile = ()=> {
    const parsed = fileList.map(f=> {
        const [w1, w2, w3] = f.split(' ');  // split into 3 words
        return { w1, w2, w3 }
    })
    return parsed;
}

/**
 * 
 * @param {String} text 
 * @returns 
 */
const buildChoiceElement = (text)=> {
    const inner = `<a href="#" class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">${text}</a>`;
    const nodeEl = document.createElement('li');
    nodeEl.innerHTML = inner;
    return nodeEl;
};


const buildAndAppendToUl = (uniqueMd1List, ulId) => {
    
    const md1Ul = document.getElementById(ulId);
    console.log('got md1;')

    uniqueMd1List.forEach(md1Item => {
        const constructedEl = buildChoiceElement(md1Item);
        console.log('md1Ul.appendChild;', constructedEl)
        md1Ul.appendChild(constructedEl);
    });
    return;
}
/**
 * 
 * @param {any[]} parsedList 
 * @param {{filterW1: String, filterW2: String, filterW3: String}} param1 
 */
const generateChoices = (parsedList, { filterW1, filterW2, filterW3 } = {}) => {
    const md1List = parsedList
        .map(({ w1, w2, w3 }) => w1)
    const uniqueMd1List = [...new Set(md1List)];

    buildAndAppendToUl(uniqueMd1List, 'ul-md1');
    // ----------------------------
    const md2List = parsedList  // dependent on MD1
        .filter(({ w1 }) => filterW1 === w1)  // only when w1 selected;
        .map(({ w1, w2, w3 }) => w2);
    
    const uniqueMd2List = [...new Set(md2List)];

    buildAndAppendToUl(uniqueMd2List, 'ul-md2');

    //----------------------------
    const md3List = parsedList  // dependent on MD2
    .filter(({ w2 }) => filterW2 === w2)  // only when w2 selected;
    .map(({ w1, w2, w3 }) => w3);

    const uniqueMd3List = [...new Set(md3List)];

    buildAndAppendToUl(uniqueMd3List, 'ul-md3');
};

const init = () => {
    const btns = {
        MD1: 'md1Btn',
        MD2: 'md2Btn',
        MD3: 'md3Btn',
    };
    const parsedFile = parseFile();
    console.log('parsedFile:', parsedFile);
    generateChoices(parsedFile);

    // populate:
}

document.addEventListener('DOMContentLoaded', (e)=>{
    console.log('loaded DOM');
    init();
})