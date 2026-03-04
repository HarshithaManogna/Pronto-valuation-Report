// script.js
const PRONTO_RED = '#E31E24';
const PRONTO_GREEN = '#00A651';

function getInitialData() {
    return {
        typeOfVal: 'RETAIL',
        date: new Date().toLocaleDateString('en-GB'),
        reportRequestedBy: 'EQUITAS SMALL FINANCE BANK',
        branch: '',
        inspectionDate: '',
        refNo: '',
        inspectionLocation: '',
        regnNo: '',
        registeredOwner: '',
        applicantName: '',
        vehicleCategory: 'COMMERCIAL VEHICLE',
        make: '',
        model: '',
        chassisNo: '',
        engineNo: '',
        yearOfMfg: '',
        registrationDate: '',
        classOfVehicle: 'GOODS CARRIAGE - HMV',
        bodyType: '',
        ownerSrNo: '1',
        rcValidity: '',
        hypothecation: '',
        valuationPrice: '',
        fuelType: 'DIESEL',
        transmission: 'MANUAL',
        odoMeter: '',
        colour: '',
        permitNo: '',
        permitValidUpTo: '',
        policyNo: '',
        insuranceValidUpTo: '',
        idv: '',
        fitnessValidUpTo: '',
        taxValidUpTo: '',
        chassisPunch: 'ORIGINAL',
        overallRating: 'GOOD',
        valuationAmount: '',
        remarks: 'VEHICLE IS IN GOOD RUNNING CONDITION.',
        videoLink: '',
        videoVisible: true,
        mainPhoto: '',
        chassisPhoto: '',
        stencilTrace: '',
        gridPhotos: Array(12).fill(''), // Start with 12 empty photo fields
        photoMetadata: {
            mainPhoto: '',
            chassisPhoto: '',
            stencilTrace: '',
            gridPhotos: Array(12).fill('')
        },
        photoVisibility: {
            mainPhoto: true,
            chassisPhoto: true,
            stencilTrace: true,
            gridPhotos: Array(12).fill(true)
        },
        defaultDeviceName: '',
        systemChecks: {
            'ENGINE CONDITION': 'GOOD',
            'CHASSIS CONDITION': 'GOOD',
            'CABIN ASSY': 'GOOD',
            'BODY ASSY': 'GOOD',
            'CABIN INTERIOR ASSY': 'GOOD',
            'LOAD BODY ASSY': 'GOOD',
            'STEERING SYSTEM': 'GOOD',
            'BRAKE SYSTEM': 'GOOD',
            'ELECTRICAL SYSTEM': 'GOOD',
            'SUSPENSION SYSTEM': 'GOOD',
            'FUEL SYSTEM': 'GOOD',
            'TYRE CONDITION': 'GOOD',
            'GEARBOX ASSY': 'GOOD',
            'CLUTCH SYSTEM': 'GOOD',
            'DIFFERENTIAL ASSY': 'GOOD',
            'RADIATOR': 'GOOD',
            'INTER COOLER': 'GOOD',
            'ALL HOSE PIPES': 'GOOD',
            'FRONT & REAR BRAKES': 'GOOD',
            'PARKING BRAKE': 'GOOD',
            'STEERING WHEEL': 'GOOD',
            'STEERING HANDLE': 'GOOD',
            'STEERING COLUMN': 'GOOD',
            'STEERING BOX': 'GOOD',
            'STEERING LINKAGES': 'GOOD',
            'CABIN': 'GOOD',
            'FRONT PANEL': 'GOOD',
            'FR GLAS FRAME': 'GOOD',
            'BONNET ASSY': 'GOOD',
            'BUMPERS': 'GOOD',
            'SIDE FENDERS': 'GOOD',
            'DASHBOARD': 'GOOD',
            'DASH BOARD': 'GOOD',
            'DOORS': 'GOOD',
            'ALL GLASSES': 'GOOD',
            'SEATS': 'GOOD',
            'SEATS & MATS': 'GOOD',
            'INTERIOR TRIMS': 'GOOD',
            'RIGHT SIDE GATE': 'GOOD',
            'LEFT SIDE GATE': 'GOOD',
            'TAIL GATE': 'GOOD',
            'LOAD FLOOR': 'GOOD',
            'LIGHTS': 'GOOD',
            'BATTERY': 'GOOD',
            'WIRING ASSY': 'GOOD',
            'SWITCHES': 'GOOD',
            'FRONT': 'GOOD',
            'REAR': 'GOOD',
            'AXLES': 'GOOD',
            'AIR CONDITIONER': 'GOOD',
            'AUDIO': 'GOOD',
            'UPHOLESHTRY': 'GOOD',
            'UPHOLSTRY': 'GOOD',
            'AIR BAGS': 'GOOD',
            'REAR GUARD': 'GOOD',
            'PULL START LEVER': 'GOOD',
            'PAINT WORK': 'GOOD'
        }
    };
}

let data = getInitialData();

let isGenerating = false;
let zoom = 1;

// Initialize Lucide icons
function initIcons() {
    lucide.createIcons();
}

// Render the entire app
function render() {
    const container = document.getElementById('report-container');
    container.innerHTML = '';
    
    // Page 1
    const page1 = createPage1();
    container.appendChild(page1);
    // Page 2
    const page2 = createPage2();
    container.appendChild(page2);
    
    // Dynamic Photo Pages
    const photosPerPage = 6;
    for (let i = 0; i < data.gridPhotos.length; i += photosPerPage) {
        const pagePhotos = data.gridPhotos.slice(i, i + photosPerPage);
        container.appendChild(createPhotoPage(pagePhotos, i));
    }

    initIcons();
    updateZoom();

    // Sync global device name input
    const globalDeviceInput = document.getElementById('global-device-name');
    if (globalDeviceInput && globalDeviceInput !== document.activeElement) {
        if (globalDeviceInput.value !== (data.defaultDeviceName || '')) {
            globalDeviceInput.value = data.defaultDeviceName || '';
        }
    }

    // Sync video link input
    const videoInput = document.getElementById('video-link-input');
    if (videoInput && videoInput !== document.activeElement) {
        if (videoInput.value !== (data.videoLink || '')) {
            videoInput.value = data.videoLink || '';
        }
    }
}

function createPage1() {
    const page = document.createElement('div');
    page.className = 'page-break bg-white';
    page.innerHTML = `
        ${getPageHeader()}
        <div class="grid grid-cols-2 border border-gray-300 mb-1">
            ${createEditableCell('TYPE OF VAL', data.typeOfVal, 'typeOfVal', { isHeader: true, options: ['RETAIL', 'REPO'] })}
            ${createEditableCell('DATE', data.date, 'date', { isHeader: true, isDate: true })}
            ${createEditableCell('REPORT REQUESTED BY', data.reportRequestedBy, 'reportRequestedBy', { isHeader: true, options: ['TVS CREDIT SERVICES LTD', 'VERITAS FINANCE PRIVATE LTD', 'EQUITAS SMALL FINANCE BANK', 'ICICI BANK LTD', 'INDUSIND BANK LIMITED', 'SUNDARAM FINANCE', 'MCV FINANCE', 'SHIVALIK SMALL FINANCE BANK LTD', 'SAKTHI FINANCE LTD', 'HDFC BANK LTD'] })}
            ${createEditableCell('BRANCH', data.branch, 'branch', { isHeader: true })}
            ${createEditableCell('INSPECTION DATE', data.inspectionDate, 'inspectionDate', { isHeader: true, isDate: true })}
            ${createEditableCell('REF NO', data.refNo, 'refNo', { isHeader: true })}
            ${createEditableCell('INSPECTION LOCATION', data.inspectionLocation, 'inspectionLocation', { isHeader: true })}
            ${createEditableCell('REGN NO', data.regnNo, 'regnNo', { isHeader: true })}
        </div>
        <div class="grid grid-cols-12 gap-2 mb-1">
            <div class="col-span-6 border border-gray-300">
                ${createEditableCell('REGISTERED OWNER', data.registeredOwner, 'registeredOwner')}
                ${createEditableCell('APPLICANT NAME', data.applicantName, 'applicantName')}
                ${createEditableCell('VEHICLE CATEGORY', data.vehicleCategory, 'vehicleCategory', { options: ['COMMERCIAL VEHICLE', 'TWO WHEELER', 'FOUR WHEELER', 'MOTOR CAR', 'MOTOR CAB / MAXI CAB', 'AUTO RICKSHAW', 'E RIKSHAW', '3W AUTO PASSENGER', '3W AUTO GOODS CARRIAGE', 'EDUCATION INSTITUTE BUS', 'CONSTRUCTION EQUIPMENT', 'MISCELLANIOUS VEHICLE', 'TRACTOR & TRAILOR'] })}
                ${createEditableCell('MAKE', data.make, 'make')}
                ${createEditableCell('MODEL', data.model, 'model')}
                ${createEditableCell('CHASSIS NO', data.chassisNo, 'chassisNo')}
                ${createEditableCell('ENGINE NO', data.engineNo, 'engineNo')}
                ${createEditableCell('YEAR OF MFG', data.yearOfMfg, 'yearOfMfg', { isDate: true })}
                ${createEditableCell('REGISTRATION DATE', data.registrationDate, 'registrationDate', { isDate: true })}
                ${createEditableCell('CLASS OF VEHICLE', data.classOfVehicle, 'classOfVehicle', { options: ['GOODS CARRIAGE - HMV', 'GOODS CARRIAGE - LMV', 'GOODS CARRIAGE - MMV', 'ARTICULATED VEHICLES', 'HEAVY PASSENGER VEHICLE', 'MEDIUM PASSENGER VEHICLE', 'LIGHT PASSENGER VEHICLE', 'E RIKSHAW', 'AUTO RIKSHAW', 'MOTOR CYCLE WITH GEAR', 'SCOOTER', 'TWO WHEELER', 'THREE WHEELER', 'EDUCATION INSTITUTE BUS', 'MAXI CAB', 'MOTOR CAB', '3W AUTO GOODS CARRIAGE', 'HEAVY GOODS VEHICLE', 'PRIVATE CAR', '3W AUTO PASSENGER'] })}
                ${createEditableCell('BODY TYPE', data.bodyType, 'bodyType')}
                ${createEditableCell('OWNER SR NO', data.ownerSrNo, 'ownerSrNo')}
                ${createEditableCell('RC VALIDITY', data.rcValidity, 'rcValidity', { isDate: true })}
                ${createEditableCell('HYPOTHECATION', data.hypothecation, 'hypothecation')}
            </div>
            <div class="col-span-6 flex flex-col relative group">
                <div class="photo-upload-box border border-[#4F81BD] h-[364px] relative" onclick="triggerUpload('mainPhoto')">
                    ${data.mainPhoto ? `
                        <img src="${data.mainPhoto}" referrerPolicy="no-referrer">
                        <div class="absolute top-1 right-1 w-8 h-5 pointer-events-none z-10">
                            <img src="https://res.cloudinary.com/drezjoynu/image/upload/v1772518638/WhatsApp_Image_2026-03-03_at_11.21.12_AM_tkumwf.jpg" class="w-full h-full object-contain opacity-60" crossOrigin="anonymous">
                        </div>
                        <div class="absolute bottom-2 right-2 z-20 flex flex-col gap-0 items-end group/caption">
                                    ${data.photoVisibility.mainPhoto ? `
                                    <div 
                                        contenteditable="true"
                                        onclick="event.stopPropagation()"
                                        onblur="updatePhotoMetadata('mainPhoto', this.innerText)"
                                        class="text-white/80 text-[10px] font-medium tracking-wider drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] outline-none min-w-[20px] print:text-white/80 text-right whitespace-pre-wrap break-words leading-tight"
                                        title="Click to edit watermark"
                                    >${data.photoMetadata?.mainPhoto || data.defaultDeviceName || ''}</div>
                                    ` : ''}
                        </div>
                    ` : `<div class="photo-upload-label">Main Vehicle Photo</div>`}
                    <input type="file" id="mainPhoto-input" class="hidden" onchange="handleFileSelect(event, 'mainPhoto')">
                </div>
                <div class="bg-white text-[#E31E24] text-center font-bold h-6 flex items-center justify-center mt-1 border border-[#4F81BD] text-[11px]">
                    <input type="text" id="vehicle-display-name-input" 
                        value="${(data.model || '') + (data.yearOfMfg ? (data.model ? ' - ' : '') + (data.yearOfMfg.includes('/') ? data.yearOfMfg.split('/').pop() : data.yearOfMfg) : '')}" 
                        onchange="updateField('vehicleDisplayName', this.value)" 
                        class="w-full bg-transparent text-center border-none outline-none focus:ring-0 p-0 font-bold text-[#E31E24] h-full flex items-center justify-center uppercase"
                    >
                </div>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-2 mb-1">
            <div class="col-span-4 border-2 border-[#00A651] p-2 flex flex-col items-center justify-center rounded-[1px] relative">
                <div class="text-[#00A651] font-bold text-[14px] flex items-center gap-2 uppercase">
                    <i data-lucide="banknote" class="w-4 h-4"></i>
                    <span>VALUATION PRICE</span>
                </div>
                <div class="text-[#00A651] font-bold text-xl flex items-center justify-center mt-1">
                    <span>RS.</span>
                    <div id="valuation-price-display" contenteditable="true" 
                        onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                        onpaste="event.preventDefault(); const text = event.clipboardData.getData('text/plain').replace(/\D/g, ''); document.execCommand('insertText', false, text);"
                        oninput="const el = document.getElementById('valuation-amount-display'); if(el) el.innerText = this.innerText"
                        onblur="updateField('valuationPrice', this.innerText)" 
                        class="bg-transparent border-none outline-none w-32 text-center text-[#00A651] font-bold h-full flex items-center justify-center"
                    >
                        ${data.valuationPrice}
                    </div>
                </div>
            </div>
            <div class="col-span-8 grid grid-cols-4 gap-2">
                ${createStatBox('FUEL', data.fuelType, 'fuelType', 'fuel', ['DIESEL', 'PETROL / LPG', 'PETROL / CNG', 'HYBRID', 'PETROL / HYBRID', 'DIESEL / HYBRID', 'ELECTRIC'])}
                ${createStatBox('TRANSMISSION', data.transmission, 'transmission', 'settings-2', ['MANUAL', 'AUTOMATIC'])}
                ${createStatBox('ODO METER', data.odoMeter, 'odoMeter', 'gauge')}
                ${createStatBox('COLOUR', data.colour, 'colour', 'palette')}
            </div>
        </div>
        <div class="mb-1">
            <div class="bg-orange-200 text-white text-center font-bold h-6 flex items-center justify-center text-[11px] uppercase tracking-widest mb-1">
                <span>DOCUMENT DETAILS</span>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <div class="border border-gray-300">
                    ${createSectionHeader('PERMIT')}
                    ${createEditableCell('PERMIT NO', data.permitNo, 'permitNo')}
                    ${createEditableCell('PERMIT VALID UP TO', data.permitValidUpTo, 'permitValidUpTo', { isDate: true })}
                </div>
                <div class="border border-gray-300">
                    ${createSectionHeader('INSURANCE')}
                    ${createEditableCell('POLICY NO', data.policyNo, 'policyNo')}
                    ${createEditableCell('VALID UP TO', data.insuranceValidUpTo, 'insuranceValidUpTo', { isDate: true })}
                    ${createEditableCell('IDV', data.idv, 'idv')}
                </div>
                <div class="border border-gray-300">
                    ${createSectionHeader('FITNESS')}
                    ${createEditableCell('FITNESS VALID UP TO', data.fitnessValidUpTo, 'fitnessValidUpTo', { isDate: true })}
                </div>
                <div class="border border-gray-300 flex flex-col">
                    ${createSectionHeader('TAX')}
                    ${createEditableCell('VALID UP TO', data.taxValidUpTo, 'taxValidUpTo', { isDate: true })}
                    ${data.videoVisible ? `
                    <div class="mt-auto p-1 flex justify-end">
                        <a id="video-btn-page1" 
                           href="${data.videoLink ? (data.videoLink.startsWith('http') ? data.videoLink : 'https://' + data.videoLink) : '#'}" 
                           target="_blank"
                           class="text-[8px] px-2 py-0.5 rounded-full flex items-center gap-1 font-bold border ${data.videoLink ? 'bg-[#E8F0FE] text-[#1A73E8] border-[#1A73E8]' : 'bg-gray-100 text-gray-400 border-gray-300'}"
                        >
                            <i data-lucide="video" class="w-2 h-2 pointer-events-none"></i>
                            <span class="pointer-events-none">${data.videoLink ? 'VIEW VIDEO' : 'NO VIDEO LINK'}</span>
                        </a>
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-x-4 mb-1">
            <div class="col-span-8">
                <div class="grid grid-cols-12 gap-y-1 mb-1">
                    <div class="col-span-6 bg-[#E37222] text-white font-bold text-[11px] h-5 flex items-center justify-center rounded-[1px]">CHASSIS PUNCH</div>
                    <div class="col-span-6 pl-4 h-5 flex items-center">
                        <div contenteditable="true" onblur="updateField('chassisPunch', this.innerText)" class="text-[#E37222] font-bold text-[11px] bg-transparent border-none outline-none w-full h-full flex items-center">
                            ${data.chassisPunch}
                        </div>
                    </div>
                    <div class="col-span-6 bg-[#FFC000] text-white font-bold text-[11px] h-5 flex items-center justify-center rounded-[1px]">OVERALL RATING</div>
                    <div class="col-span-6 pl-4 h-5 flex items-center">
                        <div contenteditable="true" onblur="updateField('overallRating', this.innerText)" class="text-[#FFC000] font-bold text-[11px] bg-transparent border-none outline-none w-full h-full flex items-center">
                            ${data.overallRating}
                        </div>
                    </div>
                    <div class="col-span-6 bg-[#00A651] text-white font-bold text-[11px] h-5 flex items-center justify-center rounded-[1px]">VALUATION AMOUNT</div>
                    <div class="col-span-6 pl-4 flex items-center text-[#00A651] font-bold text-[11px] h-5">
                        <span class="mr-1">RS.</span>
                        <div id="valuation-amount-display" contenteditable="true" 
                            onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                            onpaste="event.preventDefault(); const text = event.clipboardData.getData('text/plain').replace(/\D/g, ''); document.execCommand('insertText', false, text);"
                            oninput="const el = document.getElementById('valuation-price-display'); if(el) el.innerText = this.innerText"
                            onblur="updateField('valuationAmount', this.innerText)" 
                            class="text-inherit bg-transparent border-none outline-none w-full h-full flex items-center"
                        >
                            ${data.valuationAmount}
                        </div>
                    </div>
                </div>
                <div class="border border-gray-300 p-1 h-10 rounded-[1px]">
                    <div class="text-[8px] font-bold text-gray-400 mb-0">REMARKS :</div>
                    <textarea onchange="updateField('remarks', this.value)" class="w-full h-6 text-[10px] border-none outline-none resize-none bg-transparent leading-tight">${data.remarks}</textarea>
                </div>
            </div>
            <div class="col-span-4 flex flex-col items-start justify-start">
                ${getStampAndSignature()}
            </div>
        </div>
        <div class="text-center font-bold text-[11px] border-y border-gray-200 h-6 flex items-center justify-center mb-1">
            <span>THIS REPORT IS ISSUED WITHOUT PREJUDICE</span>
        </div>
        ${getPageFooter()}
    `;
    return page;
}

function createPage2() {
    const page = document.createElement('div');
    page.className = 'page-break bg-white';
    const ratingOptions = ['GOOD', 'AVERAGE', 'BAD', 'NO', 'POOR', 'DAMAGED', 'NA', 'SATISFACTORY'];
    
    const isCommOrBus = data.vehicleCategory === 'COMMERCIAL VEHICLE' || (data.vehicleCategory && data.vehicleCategory.includes('BUS'));
    const isFourWheeler = data.vehicleCategory === 'FOUR WHEELER' || data.vehicleCategory === 'MOTOR CAR' || data.vehicleCategory === 'MOTOR CAB / MAXI CAB';
    const isThreeWheeler = ['AUTO RICKSHAW', 'E RIKSHAW', '3W AUTO PASSENGER', '3W AUTO GOODS CARRIAGE'].includes(data.vehicleCategory);

    let basicSystems = ['ENGINE CONDITION', 'CHASSIS CONDITION', 'CABIN ASSY', 'LOAD BODY ASSY', 'BRAKE SYSTEM', 'ELECTRICAL SYSTEM', 'SUSPENSION SYSTEM', 'FUEL SYSTEM', 'TYRE CONDITION'];
    
    if (isCommOrBus || isThreeWheeler) {
        basicSystems = ['ENGINE CONDITION', 'CHASSIS CONDITION', 'CABIN ASSY', 'LOAD BODY ASSY', 'STEERING SYSTEM', 'BRAKE SYSTEM', 'ELECTRICAL SYSTEM', 'SUSPENSION SYSTEM', 'FUEL SYSTEM', 'TYRE CONDITION'];
    } else if (isFourWheeler) {
        basicSystems = ['ENGINE CONDITION', 'CHASSIS CONDITION', 'BODY ASSY', 'CABIN INTERIOR ASSY', 'STEERING SYSTEM', 'BRAKE SYSTEM', 'ELECTRICAL SYSTEM', 'SUSPENSION SYSTEM', 'FUEL SYSTEM', 'TYRE CONDITION'];
    }

    page.innerHTML = `
        ${getPageHeader()}
        <div class="grid grid-cols-2 gap-x-8 mb-2">
            <div class="space-y-4">
                <div class="border border-gray-300">
                    ${createSectionHeader('BASIC SYSTEMS')}
                    ${basicSystems.map(key => createEditableCell(key, data.systemChecks[key], `systemChecks.${key}`, { options: ratingOptions })).join('')}
                </div>
                <div class="border border-gray-300">
                    ${createSectionHeader('TRANSMISSION SYSTEM')}
                    ${['GEARBOX ASSY', 'CLUTCH SYSTEM', 'DIFFERENTIAL ASSY'].map(key => createEditableCell(key, data.systemChecks[key], `systemChecks.${key}`, { options: ratingOptions })).join('')}
                </div>
                <div class="border border-gray-300">
                    ${isThreeWheeler ? createSectionHeader('COOLING & BRAKE SYSTEM') : createSectionHeader('COOLING SYSTEM')}
                    ${(isThreeWheeler ? ['RADIATOR', 'FRONT & REAR BRAKES', 'PARKING BRAKE'] : ['RADIATOR', 'INTER COOLER', 'ALL HOSE PIPES']).map(key => createEditableCell(key, data.systemChecks[key], `systemChecks.${key}`, { options: ratingOptions })).join('')}
                </div>
                ${isThreeWheeler ? `
                <div class="border border-gray-300">
                    ${createSectionHeader('ELECTRICAL SYSTEM')}
                    ${['WIRING ASSY', 'BATTERY', 'LIGHTS', 'SWITCHES'].map(key => createEditableCell(key, data.systemChecks[key], `systemChecks.${key}`, { options: ratingOptions })).join('')}
                </div>
                ` : `
                <div class="border border-gray-300">
                    ${createSectionHeader('STEERING SYSTEM')}
                    ${['STEERING WHEEL', 'STEERING COLUMN', 'STEERING BOX', 'STEERING LINKAGES'].map(key => createEditableCell(key, data.systemChecks[key], `systemChecks.${key}`, { options: ratingOptions })).join('')}
                </div>
                `}
            </div>
            <div class="space-y-4">
                ${isFourWheeler ? `
                <div class="border border-gray-300">
                    ${createSectionHeader('EXTERIOR')}
                    ${['BONNET ASSY', 'BUMPERS', 'DOORS', 'ALL GLASSES', 'SIDE FENDERS'].map(key => createEditableCell(key, data.systemChecks[key], `systemChecks.${key}`, { options: ratingOptions })).join('')}
                </div>
                <div class="border border-gray-300">
                    ${createSectionHeader('INTERIOR')}
                    ${['DASH BOARD', 'SEATS & MATS', 'UPHOLSTRY', 'INTERIOR TRIMS'].map(key => createEditableCell(key, data.systemChecks[key], `systemChecks.${key}`, { options: ratingOptions })).join('')}
                </div>
                ` : isThreeWheeler ? `
                <div class="border border-gray-300">
                    ${createSectionHeader('CABIN')}
                    ${['FRONT PANEL', 'FR GLAS FRAME', 'DASH BOARD', 'SEATS & MATS', 'UPHOLESHTRY'].map(key => createEditableCell(key, data.systemChecks[key], `systemChecks.${key}`, { options: ratingOptions })).join('')}
                </div>
                <div class="border border-gray-300">
                    ${createSectionHeader('LOAD BODY')}
                    ${['RIGHT SIDE GATE', 'LEFT SIDE GATE', 'TAIL GATE', 'LOAD FLOOR'].map(key => createEditableCell(key, data.systemChecks[key], `systemChecks.${key}`, { options: ratingOptions })).join('')}
                </div>
                ` : `
                <div class="border border-gray-300">
                    ${createSectionHeader('CABIN')}
                    ${['CABIN', 'DASHBOARD', 'DOORS', 'ALL GLASSES', 'SEATS'].map(key => createEditableCell(key, data.systemChecks[key], `systemChecks.${key}`, { options: ratingOptions })).join('')}
                </div>
                <div class="border border-gray-300">
                    ${createSectionHeader('LOAD BODY')}
                    ${['RIGHT SIDE GATE', 'LEFT SIDE GATE', 'TAIL GATE', 'LOAD FLOOR'].map(key => createEditableCell(key, data.systemChecks[key], `systemChecks.${key}`, { options: ratingOptions })).join('')}
                </div>
                `}
                
                ${isThreeWheeler ? `
                <div class="border border-gray-300">
                    ${createSectionHeader('STEERING SYSTEM')}
                    ${['STEERING HANDLE', 'STEERING COLUMN', 'STEERING LINKAGES'].map(key => createEditableCell(key, data.systemChecks[key], `systemChecks.${key}`, { options: ratingOptions })).join('')}
                </div>
                ` : `
                <div class="border border-gray-300">
                    ${(isCommOrBus || isFourWheeler) ? createSectionHeader('ELECTRICAL SYSTEM') : createSectionHeader('ELECTRICAL & SUSPENSION')}
                    ${((isCommOrBus || isFourWheeler) ? ['LIGHTS', 'BATTERY', 'WIRING ASSY'] : ['LIGHTS', 'BATTERY', 'WIRING ASSY', 'FRONT', 'REAR', 'AXLES']).map(key => createEditableCell(key, data.systemChecks[key], `systemChecks.${key}`, { options: ratingOptions })).join('')}
                </div>
                `}

                ${(isCommOrBus || isFourWheeler || isThreeWheeler) ? `
                <div class="border border-gray-300">
                    ${createSectionHeader('SUSPENSION SYSTEM')}
                    ${['FRONT', 'REAR', 'AXLES'].map(key => createEditableCell(key, data.systemChecks[key], `systemChecks.${key}`, { options: ratingOptions })).join('')}
                </div>
                ` : ''}
                <div class="border border-gray-300">
                    ${createSectionHeader('OTHER SYSTEMS')}
                    ${(isFourWheeler ? ['AIR CONDITIONER', 'AUDIO', 'AIR BAGS', 'PAINT WORK'] : isThreeWheeler ? ['REAR GUARD', 'AUDIO', 'PULL START LEVER', 'PAINT WORK'] : ['AIR CONDITIONER', 'AUDIO', 'UPHOLESHTRY', 'PAINT WORK']).map(key => createEditableCell(key, data.systemChecks[key], `systemChecks.${key}`, { options: ratingOptions })).join('')}
                </div>
            </div>
        </div>
        <div class="space-y-1 mb-1">
            <div class="flex gap-4 h-14">
                <div class="w-1/3 bg-blue-500 text-white flex items-center justify-center font-bold text-[10px] rounded-sm uppercase">CHASSIS NO PHOTO</div>
                <div class="photo-upload-box flex-1 border border-gray-300 relative" onclick="triggerUpload('chassisPhoto')">
                    ${data.chassisPhoto ? `
                        <img src="${data.chassisPhoto}" referrerPolicy="no-referrer">
                        <div class="absolute top-1 right-1 w-6 h-4 pointer-events-none z-10">
                            <img src="https://res.cloudinary.com/drezjoynu/image/upload/v1772518638/WhatsApp_Image_2026-03-03_at_11.21.12_AM_tkumwf.jpg" class="w-full h-full object-contain opacity-60" crossOrigin="anonymous">
                        </div>
                    ` : `<div class="photo-upload-label">Upload Chassis Photo</div>`}
                    <input type="file" id="chassisPhoto-input" class="hidden" onchange="handleFileSelect(event, 'chassisPhoto')">
                </div>
            </div>
            <div class="flex gap-4 h-14">
                <div class="w-1/3 bg-blue-500 text-white flex items-center justify-center font-bold text-[10px] rounded-sm uppercase">STENCIL TRACE</div>
                <div class="photo-upload-box flex-1 border border-gray-300 relative" onclick="triggerUpload('stencilTrace')">
                    ${data.stencilTrace ? `
                        <img src="${data.stencilTrace}" referrerPolicy="no-referrer">
                        <div class="absolute top-1 right-1 w-6 h-4 pointer-events-none z-10">
                            <img src="https://res.cloudinary.com/drezjoynu/image/upload/v1772518638/WhatsApp_Image_2026-03-03_at_11.21.12_AM_tkumwf.jpg" class="w-full h-full object-contain opacity-60" crossOrigin="anonymous">
                        </div>
                    ` : `<div class="photo-upload-label">Upload Stencil Trace</div>`}
                    <input type="file" id="stencilTrace-input" class="hidden" onchange="handleFileSelect(event, 'stencilTrace')">
                </div>
            </div>
        </div>
        <div class="flex gap-4 mb-1">
            <div class="flex-1 border-2 border-gray-300 p-1 rounded-[1px] text-[8px] leading-tight text-gray-700">
                <span class="font-bold">DISCLAIMER :</span> We are not responsible for verifying the authenticity of the associated documents of the vehicle. We are not relied on the odometer reading of any vehicle at the time of physical inspection and isnt answerable for verifying the authenticity thereof. Our organization is not responsible for any direct, indirect or exceptional damages for any misusage of this report. As there is no any standard price list for used vehicles, Valuation amount mentioned in this report is our professional opinion on the market value of the vehicle based on our standard valuation methodology & procedures. This report is based entirely on the personel inspection carried out and is issued without prejudice or favour nor bindings.
            </div>
            <div class="w-56 flex items-center justify-between">
                ${getStampAndSignature(true)}
            </div>
        </div>
        ${getPageFooter()}
    `;
    return page;
}

function createPhotoPage(photos, startIndex) {
    const page = document.createElement('div');
    page.className = 'page-break bg-white';
    
    // Calculate grid rows based on number of photos on this page
    const numPhotos = photos.length;
    const rows = Math.ceil(numPhotos / 2);
    const gridStyle = `height: 225mm; grid-template-rows: repeat(3, 1fr);`; // Keep fixed height for consistency

    page.innerHTML = `
        ${getPageHeader()}
        <div class="grid grid-cols-2 gap-4 mb-2" style="${gridStyle}">
            ${photos.map((photo, i) => {
                const globalIndex = startIndex + i;
                return `
                    <div class="photo-upload-box border border-gray-200 group relative" style="height: 100%">
                        <div class="absolute top-2 right-2 flex gap-2 no-print z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onclick="removePhoto(${globalIndex})" class="bg-red-500 text-white p-1 rounded shadow-md hover:bg-red-600" title="Remove Photo">
                                <i data-lucide="trash-2" class="w-4 h-4"></i>
                            </button>
                        </div>
                        <div class="w-full h-full flex items-center justify-center cursor-pointer" onclick="triggerUpload('gridPhoto-${globalIndex}')">
                            ${photo ? `
                                <img src="${photo}" referrerPolicy="no-referrer" style="max-height: 100%; width: 100%; object-fit: contain;">
                                <div class="absolute top-1 right-1 w-6 h-4 pointer-events-none z-10">
                                    <img src="https://res.cloudinary.com/drezjoynu/image/upload/v1772518638/WhatsApp_Image_2026-03-03_at_11.21.12_AM_tkumwf.jpg" class="w-full h-full object-contain opacity-60" crossOrigin="anonymous">
                                </div>
                                <div class="absolute bottom-2 right-2 z-20 text-right group/caption">
                                    ${data.photoVisibility.gridPhotos[globalIndex] ? `
                                    <div 
                                        contenteditable="true"
                                        onclick="event.stopPropagation()"
                                        onblur="updatePhotoMetadata('gridPhoto-${globalIndex}', this.innerText)"
                                        class="text-white/80 text-[9px] font-medium tracking-wider drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] outline-none min-w-[10px] print:text-white/80 whitespace-pre-wrap break-words leading-tight"
                                    >${data.photoMetadata?.gridPhotos[globalIndex] || data.defaultDeviceName || ''}</div>
                                    ` : ''}
                                </div>
                            ` : `<div class="photo-upload-label">Photo ${globalIndex + 1}</div>`}
                        </div>
                        <input type="file" id="gridPhoto-${globalIndex}-input" class="hidden" onchange="handleFileSelect(event, 'gridPhoto-${globalIndex}')">
                    </div>
                `;
            }).join('')}
        </div>
        <div class="flex justify-end pr-10 mb-1 relative z-10">
            <div class="w-16 h-16 rotate-[-12deg] opacity-80">
                <img src="https://res.cloudinary.com/drezjoynu/image/upload/v1771488417/stamp_t7gqwe.png" alt="Stamp" class="w-full h-full object-contain" crossOrigin="anonymous">
            </div>
        </div>
        ${getPageFooter()}
    `;
    return page;
}

function getPageHeader() {
    return `
        <div class="flex justify-between items-start mb-2 border-b border-gray-800 pb-2">
            <div class="flex items-center gap-2">
                <div class="flex items-center">
                    <div class="relative w-20 h-14 flex items-center justify-center">
                        <img src="https://res.cloudinary.com/drezjoynu/image/upload/v1772518638/WhatsApp_Image_2026-03-03_at_11.21.12_AM_tkumwf.jpg" alt="Pronto Moto Logo" class="w-full h-full object-contain" crossOrigin="anonymous">
                    </div>
                    <div class="ml-2">
                        <h1 class="text-2xl font-bold tracking-tighter flex items-center">
                            <span style="color: #00A651">PRONTO</span>
                            <span class="mx-2" style="color: #E31E24">MOTO SERVICES</span>
                        </h1>
                    </div>
                </div>
            </div>
            <div class="text-right">
                <div class="bg-[#E31E24] text-white px-4 h-6 flex items-center justify-center font-bold text-sm rounded-[1px] mb-1">
                    VALUATION REPORT
                </div>
                <div class="text-lg font-bold text-gray-800 tracking-tight flex items-center justify-end h-7">
                    <div contenteditable="true" 
                         oninput="updateRegnNo(this.innerText, 'header')" 
                         class="regn-no-header-display bg-transparent border-none outline-none text-right font-bold w-40 focus:ring-0 p-0 h-full flex items-center justify-end"
                         data-placeholder="ENTER REG NO"
                    >
                        ${data.regnNo || ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getPageFooter() {
    return `
        <div class="mt-auto pt-1 border-t border-gray-300 text-center w-full bg-white z-50">
            <div class="flex flex-col items-center gap-0.5 text-[8px] text-gray-400 py-1">
                <div class="flex items-center gap-1" style="line-height: 12px">
                    <span style="font-size: 8px">🏠</span>
                    <span>Registered Address: F-1, 2-216/A, Vakalapudi, Kakinada, East Godavari Dist, Andhra Pradesh– 533005</span>
                </div>
                <div class="flex items-center gap-4" style="line-height: 12px">
                    <span>🌐 www.prontomoto.in</span>
                    <span>✉ connect@prontomoto.in</span>
                    <span>📞 0884 - 3596574</span>
                    <span>📱 +91 9885755567</span>
                </div>
            </div>
        </div>
    `;
}

function getStampAndSignature(isSmall = false) {
    const stampSize = isSmall ? 'w-16 h-16' : 'w-20 h-20';
    const sigHeight = isSmall ? 'h-6' : 'h-7';
    const textSize = isSmall ? 'text-[8px]' : 'text-[9px]';
    const nameSize = isSmall ? 'text-[9px]' : 'text-[10px]';

    return `
        <div class="flex items-start justify-between w-full mt-1">
            <div class="relative ${stampSize} flex items-center justify-center rotate-[-12deg] opacity-90 select-none pointer-events-none">
                <img src="https://res.cloudinary.com/drezjoynu/image/upload/v1771488417/stamp_t7gqwe.png" alt="Certified Stamp" class="w-full h-full object-contain" crossOrigin="anonymous">
            </div>
            <div class="text-right flex-1 pl-2">
                <div class="${textSize} font-bold text-gray-600 mb-1 leading-none mt-0">Approved by</div>
                <div class="${sigHeight} flex items-end justify-end mb-1">
                    <img src="https://res.cloudinary.com/drezjoynu/image/upload/v1771488417/signature_uzlbnn.png" alt="Signature" class="h-full object-contain" crossOrigin="anonymous">
                </div>
                <div class="border-b border-gray-800 w-full mb-1"></div>
                <div class="${nameSize} font-bold leading-none">Mahesh Garikina</div>
                <div class="${textSize} text-gray-500 leading-none">License No : 74183</div>
                <div class="${textSize} text-gray-500 leading-none">Pronto Moto Services</div>
            </div>
        </div>
    `;
}

function createEditableCell(label, value, field, options = {}) {
    const { isHeader = false, options: selectOptions, isDate = false } = options;
    const labelClass = isHeader ? "bg-[#4F81BD] text-white w-[42%]" : "bg-white text-gray-800 w-1/2";
    
    let valueHtml = '';
    if (selectOptions) {
        const isOther = value && !selectOptions.map(o => o.toUpperCase()).includes(value.toUpperCase()) && value !== '' && value !== 'OTHER';
        const showInput = isOther || value === 'OTHER';
        
        if (showInput) {
            valueHtml = `
                <div class="flex items-center w-full gap-1 h-full">
                    <input type="text" value="${isOther ? value : ''}" placeholder="Type here..." 
                        onchange="updateField('${field}', this.value); render();" 
                        class="flex-1 bg-transparent outline-none border-none focus:ring-0 p-0 h-full min-h-[24px] text-[11px] bg-blue-50/30"
                        autofocus
                    >
                    <button onclick="updateField('${field}', ''); render();" class="p-0.5 hover:bg-gray-100 rounded text-gray-400 no-print" title="Back to options">
                        <i data-lucide="undo-2" class="w-3 h-3"></i>
                    </button>
                </div>
            `;
        } else {
            valueHtml = `
                <select onchange="handleSelectChange(event, '${field}')" class="w-full bg-transparent outline-none border-none focus:ring-0 p-0 appearance-none cursor-pointer h-full min-h-[24px]">
                    <option value="" disabled ${!value ? 'selected' : ''}>Select</option>
                    ${selectOptions.map(opt => `<option value="${opt.toUpperCase()}" ${value.toUpperCase() === opt.toUpperCase() ? 'selected' : ''}>${opt}</option>`).join('')}
                    <option value="OTHER">OTHER</option>
                </select>
            `;
        }
    } else {
        const now = new Date();
        const today = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        const allowFuture = ['rcValidity', 'permitValidUpTo', 'insuranceValidUpTo', 'fitnessValidUpTo', 'taxValidUpTo'].includes(field);
        valueHtml = `
            <div class="flex items-center w-full gap-1 h-full">
                <input type="text" 
                    value="${value}" 
                    oninput="${field === 'regnNo' ? `updateRegnNo(this.value, 'table')` : `updateField('${field}', this.value)`}"
                    ${isDate ? `onblur="window.validateAndFormatDate(this, '${field}')"` : ''}
                    ${field === 'regnNo' ? 'class="regn-no-table-input flex-1 bg-transparent outline-none border-none focus:ring-0 p-0 h-full min-h-[24px]"' : 'class="flex-1 bg-transparent outline-none border-none focus:ring-0 p-0 h-full min-h-[24px]"'}
                >
                ${isDate ? `<input type="date" ${allowFuture ? '' : `max="${today}"`} onchange="handleDateChange(event, '${field}')" class="w-6 h-6 opacity-0 absolute right-2 cursor-pointer">` : ''}
            </div>
        `;
    }

    return `
        <div class="editable-cell">
            <div class="editable-cell-label ${labelClass}">${label}</div>
            <div class="editable-cell-value">${valueHtml}</div>
        </div>
    `;
}

function createStatBox(label, value, field, icon, options = null) {
    let valueHtml = '';
    if (options) {
        const isOther = value && !options.map(o => o.toUpperCase()).includes(value.toUpperCase()) && value !== '' && value !== 'OTHER';
        const showInput = isOther || value === 'OTHER';

        if (showInput) {
            valueHtml = `
                <div class="flex items-center w-full gap-1 h-5">
                    <input type="text" value="${isOther ? value : ''}" placeholder="..." 
                        onchange="updateField('${field}', this.value); render();" 
                        class="flex-1 bg-transparent outline-none border-none focus:ring-0 p-0 h-full text-[11px] font-bold text-center bg-blue-50/30"
                        autofocus
                    >
                    <button onclick="updateField('${field}', ''); render();" class="p-0.5 hover:bg-gray-100 rounded text-gray-400 no-print" title="Back">
                        <i data-lucide="undo-2" class="w-3 h-3"></i>
                    </button>
                </div>
            `;
        } else {
            valueHtml = `
                <select onchange="updateField('${field}', this.value); render();" class="text-[11px] font-bold text-center w-full bg-transparent border-none outline-none h-5 flex items-center justify-center appearance-none cursor-pointer">
                    <option value="" disabled ${!value ? 'selected' : ''}>Select</option>
                    ${options.map(opt => `<option value="${opt.toUpperCase()}" ${value.toUpperCase() === opt.toUpperCase() ? 'selected' : ''}>${opt}</option>`).join('')}
                    <option value="OTHER">OTHER</option>
                </select>
            `;
        }
    } else {
        valueHtml = `<input type="text" value="${value}" onchange="updateField('${field}', this.value)" class="text-[11px] font-bold text-center w-full bg-transparent border-none outline-none h-5 flex items-center justify-center">`;
    }

    return `
        <div class="flex flex-col items-center justify-center border border-gray-200 p-1">
            <div class="flex items-center gap-1 mb-1">
                <i data-lucide="${icon}" class="w-3 h-3 text-orange-600 shrink-0"></i>
                <span class="text-[10px] font-bold text-orange-600 flex items-center h-full">${label}</span>
            </div>
            ${valueHtml}
        </div>
    `;
}

function createSectionHeader(title) {
    return `<div class="section-header">${title}</div>`;
}

// Event Handlers
window.addPhoto = function() {
    data.gridPhotos.push('');
    data.photoMetadata.gridPhotos.push('');
    render();
};

window.resetForm = function() {
    data = getInitialData();
    render();
    // Reset the global device name input in the toolbar
    const globalDeviceInput = document.getElementById('global-device-name');
    if (globalDeviceInput) globalDeviceInput.value = '';
    
    // Reset video link input
    const videoInput = document.getElementById('video-link-input');
    if (videoInput) videoInput.value = '';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.removePhoto = function(index) {
    if (data.gridPhotos.length <= 1) {
        data.gridPhotos[0] = '';
        data.photoMetadata.gridPhotos[0] = '';
    } else {
        data.gridPhotos.splice(index, 1);
        data.photoMetadata.gridPhotos.splice(index, 1);
    }
    render();
};

window.updateRegnNo = function(value, source) {
    const val = value.toUpperCase();
    data.regnNo = val;
    
    // Update all header displays
    const headers = document.querySelectorAll('.regn-no-header-display');
    headers.forEach(h => {
        if (source !== 'header' || h !== document.activeElement) {
            h.innerText = val;
        }
    });
    
    // Update table input
    const tableInputs = document.querySelectorAll('.regn-no-table-input');
    tableInputs.forEach(i => {
        if (source !== 'table' || i !== document.activeElement) {
            i.value = val;
        }
    });
};

window.handleSelectChange = function(event, field) {
    const val = event.target.value;
    updateField(field, val);
    render();
};

window.formatIndianCurrency = function(val) {
    if (!val) return '';
    // Strip everything except numbers
    let x = val.toString().replace(/\D/g, '');
    if (x === '') return '';
    
    // Format as Indian Currency (Lakhs/Crores)
    let lastThree = x.substring(x.length - 3);
    let otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== '') {
        lastThree = ',' + lastThree;
    }
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
};

window.updateField = function(field, value) {
    let trimmedValue = value;
    
    // Enforce uppercase for everything EXCEPT the video link, device name, and image data
    const isImageField = field === 'mainPhoto' || field === 'chassisPhoto' || field === 'stencilTrace' || field.startsWith('gridPhoto-');
    const isExempt = field === 'videoLink' || field === 'defaultDeviceName' || isImageField;
    
    if (typeof value === 'string' && !isExempt) {
        trimmedValue = value.toUpperCase();
    }
    
    // Update active element if it's an input/textarea to ensure it's uppercase in the DOM
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA') && !isExempt) {
        if (activeEl.value !== trimmedValue && activeEl.value.toUpperCase() === trimmedValue) {
            const start = activeEl.selectionStart;
            const end = activeEl.selectionEnd;
            activeEl.value = trimmedValue;
            activeEl.setSelectionRange(start, end);
        }
    }
    
    if (field.startsWith('systemChecks.')) {
        const key = field.split('.')[1];
        data.systemChecks[key] = trimmedValue;
    } else if (field.startsWith('gridPhoto-')) {
        const index = parseInt(field.split('-')[1]);
        data.gridPhotos[index] = trimmedValue;
    } else {
        // Special handling for Valuation Price and Amount
        if (field === 'valuationPrice' || field === 'valuationAmount') {
            const numericValue = trimmedValue.replace(/\D/g, '');
            const formatted = formatIndianCurrency(numericValue);
            data.valuationPrice = formatted;
            data.valuationAmount = formatted;
            
            const priceEl = document.getElementById('valuation-price-display');
            const amountEl = document.getElementById('valuation-amount-display');
            
            if (priceEl && priceEl.innerText.trim() !== formatted) priceEl.innerText = formatted;
            if (amountEl && amountEl.innerText.trim() !== formatted) amountEl.innerText = formatted;
        } else {
            data[field] = trimmedValue;
        }

        // Update vehicle display name if model or year changes
        if (field === 'model' || field === 'yearOfMfg') {
            const displayInput = document.getElementById('vehicle-display-name-input');
            if (displayInput) {
                const year = data.yearOfMfg ? (data.yearOfMfg.includes('/') ? data.yearOfMfg.split('/').pop() : data.yearOfMfg) : '';
                const model = data.model || '';
                let displayName = model;
                if (year) {
                    displayName += (model ? ' - ' : '') + year;
                }
                displayInput.value = displayName.trim().toUpperCase();
            }
        }
        
        // If vehicle category is updated, re-render to update Page 2 layout
        if (field === 'vehicleCategory') {
            render();
        }
    }
};

window.updatePhotoMetadata = function(field, value, skipRender = false) {
    const val = value; // Removed .trim() to allow spaces while typing
    if (field.startsWith('gridPhoto-')) {
        const index = parseInt(field.split('-')[1]);
        data.photoMetadata.gridPhotos[index] = val;
    } else {
        data.photoMetadata[field] = val;
    }
    
    if (!skipRender) {
        render();
    }
};

window.handleDateChange = function(event, field) {
    const dateStr = event.target.value;
    if (dateStr) {
        const [y, m, d] = dateStr.split('-').map(Number);
        const selectedDate = new Date(y, m - 1, d);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const allowFuture = ['rcValidity', 'permitValidUpTo', 'insuranceValidUpTo', 'fitnessValidUpTo', 'taxValidUpTo'].includes(field);
        
        if (!allowFuture && selectedDate > today) {
            alert("Future dates are not allowed for this field.");
            event.target.value = '';
            return;
        }

        updateField(field, `${d.toString().padStart(2, '0')}/${m.toString().padStart(2, '0')}/${y}`);
        render();
    }
};

window.validateAndFormatDate = function(input, field) {
    let val = input.value.trim();
    if (!val) return;

    // Try to parse various formats
    let d, m, y;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Matches DD/MM/YYYY, DD-MM-YYYY, DD.MM.YYYY
    const dmyMatch = val.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/);
    if (dmyMatch) {
        d = parseInt(dmyMatch[1]);
        m = parseInt(dmyMatch[2]);
        y = parseInt(dmyMatch[3]);
    } else {
        // Try standard Date parsing as fallback
        const parsed = new Date(val);
        if (!isNaN(parsed.getTime())) {
            d = parsed.getDate();
            m = parsed.getMonth() + 1;
            y = parsed.getFullYear();
        }
    }

    if (d && m && y) {
        const checkDate = new Date(y, m - 1, d);
        const allowFuture = ['rcValidity', 'permitValidUpTo', 'insuranceValidUpTo', 'fitnessValidUpTo', 'taxValidUpTo'].includes(field);

        if (!allowFuture && checkDate > today) {
            alert("Future dates are not allowed for this field.");
            input.value = data[field] || '';
            return;
        }
        
        const formatted = `${d.toString().padStart(2, '0')}/${m.toString().padStart(2, '0')}/${y}`;
        updateField(field, formatted);
        input.value = formatted;
        render();
    } else {
        // If invalid, revert or leave as is? User said "no matter what format we give"
        // so we should try our best. If it's totally garbage, maybe alert.
        alert("Invalid date format. Please use DD/MM/YYYY");
        input.value = data[field] || '';
    }
};

window.triggerUpload = function(id) {
    document.getElementById(`${id}-input`).click();
};

window.handleFileSelect = async function(event, id) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const compressed = await compressImage(e.target.result, 1000, 0.7);
            updateField(id, compressed);
            render();
        };
        reader.readAsDataURL(file);
    }
};

async function compressImage(base64Str, maxWidth, quality) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64Str;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxWidth) {
                    width *= maxWidth / height;
                    height = maxWidth;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', quality));
        };
    });
}

window.updateVideoLink = function(val) {
    data.videoLink = val;
    const btn = document.getElementById('video-btn-page1');
    if (btn) {
        const url = val ? (val.startsWith('http') ? val : 'https://' + val) : '#';
        btn.href = url;
        btn.innerHTML = `<i data-lucide="video" class="w-2 h-2 pointer-events-none"></i><span class="pointer-events-none">${val ? 'VIEW VIDEO' : 'NO VIDEO LINK'}</span>`;
        btn.className = `text-[8px] px-2 py-0.5 rounded-full flex items-center gap-1 font-bold border ${val ? 'bg-[#E8F0FE] text-[#1A73E8] border-[#1A73E8]' : 'bg-gray-100 text-gray-400 border-gray-300'}`;
        initIcons();
    }
};

window.toggleVideoVisibility = function(checkbox) {
    data.videoVisible = checkbox.checked;
    render();
};

window.generatePDF = async function(btn) {
    if (isGenerating) return;
    isGenerating = true;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>Generating...</span>';
    
    const element = document.getElementById('report-container');
    element.classList.add('is-pdf-generating');
    
    const opt = {
        margin: [0, 0, 0, 0],
        filename: `valuation_report_${data.regnNo ? data.regnNo.toLowerCase() : 'reg_no'}.pdf`,
        image: { type: 'jpeg', quality: 0.65 },
        html2canvas: {
            scale: 1.75,
            useCORS: true,
            logging: false,
            letterRendering: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            onclone: (clonedDoc) => {
                const clonedElement = clonedDoc.getElementById('report-container');
                if (clonedElement) {
                    // Force uppercase on all text in the cloned element
                    const walker = clonedDoc.createTreeWalker(clonedElement, NodeFilter.SHOW_TEXT, null, false);
                    let node;
                    while (node = walker.nextNode()) {
                        // Skip if parent is video link or specifically marked to skip (like photo captions)
                        const parent = node.parentElement;
                        if (parent && (
                            parent.id === 'video-link-input' || 
                            parent.closest('#video-link-container') || 
                            parent.getAttribute('contenteditable') === 'true'
                        )) {
                            continue;
                        }
                        node.nodeValue = node.nodeValue.toUpperCase();
                    }
                    // Force uppercase on all inputs/textareas in the cloned element
                    clonedElement.querySelectorAll('input, textarea, select').forEach(input => {
                        if (input.id !== 'video-link-input' && input.id !== 'global-device-name') {
                            input.value = input.value.toUpperCase();
                        }
                    });
                }
            }
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true },
        pagebreak: { mode: 'css' },
        enableLinks: true
    };

    try {
        const blob = await html2pdf().from(element).set(opt).output('blob');
        const json = JSON.stringify(data);
        const marker = "\n%PRONTO_DATA%";
        const finalBlob = new Blob([blob, marker, json], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(finalBlob);
        link.download = opt.filename;
        link.click();
        setTimeout(() => URL.revokeObjectURL(link.href), 100);
    } catch (err) {
        console.error(err);
        alert('PDF Generation Failed');
    } finally {
        element.classList.remove('is-pdf-generating');
        isGenerating = false;
        btn.innerHTML = originalText;
    }
};

window.triggerPDFUpload = function() {
    const input = document.getElementById('pdf-upload-input');
    if (input) input.click();
};

window.zoomIn = () => { zoom += 0.1; updateZoom(); };
window.zoomOut = () => { zoom = Math.max(0.5, zoom - 0.1); updateZoom(); };
window.zoomReset = () => { zoom = 1; updateZoom(); };

function updateZoom() {
    const el = document.getElementById('report-container');
    if (el) {
        el.style.transform = `scale(${zoom})`;
        const zoomLevelEl = document.getElementById('zoom-level');
        if (zoomLevelEl) zoomLevelEl.textContent = `${Math.round(zoom * 100)}%`;
    }
}

window.togglePhotoVisibility = function(field, visible) {
    if (field.startsWith('gridPhoto-')) {
        const index = parseInt(field.split('-')[1]);
        data.photoVisibility.gridPhotos[index] = visible;
    } else {
        data.photoVisibility[field] = visible;
    }
    render();
};

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    render();
    
    // Attach PDF upload listener once
    const pdfUploadInput = document.getElementById('pdf-upload-input');
    if (pdfUploadInput) {
        pdfUploadInput.onchange = function(e) {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function() {
                const content = reader.result;
                const marker = "%PRONTO_DATA%";
                const index = content.lastIndexOf(marker);
                if (index === -1) {
                    alert("Could not find valuation data in this PDF. Make sure it was generated by this app.");
                    return;
                }
                try {
                    const jsonStr = content.substring(index + marker.length);
                    const importedData = JSON.parse(jsonStr);
                    data = { ...data, ...importedData };
                    const videoInput = document.getElementById('video-link-input');
                    if (videoInput) videoInput.value = data.videoLink || '';
                    const videoToggle = document.getElementById('video-visibility-toggle');
                    if (videoToggle) videoToggle.checked = data.videoVisible !== false;
                    render();
                    alert("Report data loaded successfully from PDF!");
                } catch (err) {
                    console.error("Parse error:", err);
                    alert("Failed to extract data from PDF. The file might be corrupted.");
                }
            };
            reader.readAsText(file);
            e.target.value = '';
        };
    }
});
