// Mettre à jour cette liste à chaque ajout/suppression d'image ( généré à travers le node-parser )
let parsedList = ["3way_BTN_in BBvBTN_MR 15.png","3way_BTN_in BBvBTN_MR_SB3Betsize 25.png","3way_BTN_in BBvBTN_MR_SBShove 11.png","3way_BTN_in BBvBTN_MR_SBShove 17.png","3way_BTN_in BBvBTN_MR_SBShove 23.png","3way_BTN_in BBvBTN_OS 13.png","3way_BTN_in BBvBTN_OS 17.png","3way_BTN_in BTN 11.png","3way_BTN_in BTN 19.png","3way_BTN_in BTN 23.png","3way_BTN_in BTNv3BetsizeBB 21.png","3way_BTN_in BTNv3BetsizeSB 21.png","3way_BTN_in BTNvBB_Shove 15.png","3way_BTN_in BTNvBB_Shove 23.png","3way_BTN_in BTNvSB_Shove 15.png","3way_BTN_in BTNvSB_Shove 25.png","3way_BTN_in BTNvSB_ShoveandBB_Reshove 13.png","3way_BTN_in BTNvSB_ShoveandBB_Reshove 21.png","3way_BTN_in SBvBTN_MR 15.png","3way_BTN_in SBvBTN_MR 23.png","3way_BTN_in SBvBTN_OS 13.png","3way_BvB BBvSB_L 13.png","3way_BvB BBvSB_LimpShove 13.png","3way_BvB BBvSB_LimpShove 21.png","3way_BvB BBvSB_LimpShove 23.png","3way_BvB BBvSB_OS 13.png","3way_BvB BBvSB_OS 21.png","3way_BvB BBvSB_R 13.png","3way_BvB BBvSB_R 17.png","3way_BvB SB 11.png","3way_BvB SB 23.png","3way_BvB SBv1tierStack 13.png","3way_BvB SBv1tierStack 23.png","3way_BvB SBv3BetShove 17.png","3way_BvB SBv3betSize 23.png","3way_BvB SBvISO_AI 13.png","3way_BvB SBvISO_AI 23.png","3way_BvB SBvISO_NAI 17.png","3way_BvB SBvISO_NAI 23.png","3way_BvB SBvISO_NAI 9.png","HU HU_BBvLSB 13.png","HU HU_BBvLSB 9.png","HU HU_BBvMRSB 14.png","HU HU_BBvMRSB 23.png","HU HU_BBvOS 16.png","HU HU_RSBvRS 23.png","HU HU_SB 13.png","HU HU_SB 20.png","HU HU_SB 23.png","HU HU_SB 25.png","HU HU_SB 8.png","HU HU_SBv1tierStack 9.png","HU HU_SBvISO_AI 10.png","HU HU_SBvISO_AI 18.png","HU HU_SBvISO_AI 8.png","HU HU_SBvISO_NAI 12.png","HU HU_SBvISO_NAI 18.png","HU HU_SBvISO_NAI 23.png","HU HU_SBzzzz 25.png"]

let selectionValues = {}

console.log('myJson')
const parseFile = (rawList)=> {
    const parsed = rawList.map(f=> {
        const [w1, w2, w3] = f.split(' ');  // split into 3 words
        const w3withoutPng = w3.substring(0, w3.length-4);  // removing .png part
        return { w1, w2, w3: w3withoutPng }
    })
    return parsed;
}

/**
 * 
 * @param {String} text 
 * @returns 
 */
const buildChoiceElement = (text)=> {
    const nodeEl = document.createElement('option');
    nodeEl.setAttribute('value', text);
    nodeEl.innerHTML = text;
    return nodeEl;
};

const generateImage = ({ w1, w2, w3 }) => {
    const imagePath = `ranges_hrc_images_partielles/ranges hrc images partielles/${w1} ${w2} ${w3}.png`;
    console.log('setting image to', { imagePath });
    const imageEl = document.getElementById('image-generated');
    imageEl.setAttribute('src', imagePath);
}

const storeValuesOfSelections = ({ filterW1, filterW2, filterW3 })=> {
    selectionValues = { filterW1, filterW2, filterW3 };
}
const getFilters = ()=> {
    
    const { value: filterW1 } = document.getElementById('ul-md1');
    const { value: filterW2 } = document.getElementById('ul-md2');
    const { value: filterW3 } = document.getElementById('ul-md3');
    return ({ filterW1, filterW2, filterW3 })
}
const onSelectAValue = (skip) => {
    const { filterW1, filterW2, filterW3 } = getFilters();
    generateImage({ w1: filterW1, w2: filterW2, w3: filterW3 });
    generateChoices({ filterW1, filterW2, filterW3 }, skip)
};

const buildAndAppendToUl = (uniqueMd1List, ulId) => {
    const md1Ul = document.getElementById(ulId);
    const { filterW1, filterW2, filterW3 } = getFilters();

    const mapping = { 'ul-md1': filterW1, 'ul-md2': filterW2, 'ul-md3': filterW3 }
    /*if (mapping[ulId] && mapping[ulId] !== ''){
        return; // do not append if it is already selected
    }*/
    md1Ul.innerHTML = '';   // TODO verify if we flush or not
    md1Ul.addEventListener('change', e => { 
        onSelectAValue(ulId);
    });
    console.log('got md truc;')

    uniqueMd1List.forEach(md1Item => {
        const constructedEl = buildChoiceElement(md1Item);
        console.log('appendChild;', constructedEl)
        md1Ul.appendChild(constructedEl);
    });
    
    return;
}
/**
 * 
 * @param {{filterW1: String, filterW2: String, filterW3: String}} param1 
 */
const generateChoices = ({ filterW1, filterW2, filterW3 } = {}, justSelected = '') => {
    // ----------🟢MD1------------------
    if ([''].includes(justSelected)){
        const md1List = parsedList
        .map(({ w1, w2, w3 }) => w1)
        const uniqueMd1List = ['', ...new Set(md1List)]; // adding empty to the list

        buildAndAppendToUl(uniqueMd1List, 'ul-md1');
    }
    
    // ----------🟢MD2------------------
    
    if (['', 'ul-md1'].includes(justSelected)){
        const md2List = parsedList  // dependent on MD1
            .filter(({ w1 }) => filterW1 === w1)  // only when w1 selected;
            .map(({ w1, w2, w3 }) => w2);
        
        const uniqueMd2List = ['', ...new Set(md2List)];     // adding empty to the list

        buildAndAppendToUl(uniqueMd2List, 'ul-md2');
    }
    //-----------🟢MD3-----------------
    if (['', 'ul-md1', 'ul-md2'].includes(justSelected)){
        const md3List = parsedList  // dependent on MD2
        .filter(({ w2 }) => filterW2 === w2)  // only when w2 selected;
        .map(({ w1, w2, w3 }) => w3);

        const uniqueMd3List = ['', ...new Set(md3List)]; // adding empty to the list

        buildAndAppendToUl(uniqueMd3List, 'ul-md3');
    }
};

const init = () => {
    parsedList = parseFile(parsedList);
    generateChoices();
}

document.addEventListener('DOMContentLoaded', (e)=>{
    console.log('loaded DOM');
    init();
})