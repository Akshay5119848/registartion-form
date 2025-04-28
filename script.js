document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('admissionForm');
    const dataTableBody = document.getElementById('submittedDataTable').querySelector('tbody');
    const formNumberDisplay = document.getElementById('formNumberDisplay');
    const formNumberInput = document.getElementById('formNumber');
    const submitBtn = document.getElementById('submitBtn');

    const casteSelect = document.getElementById('caste');
    const casteCertificateRow = document.getElementById('casteCertificateRow');
    const casteCertificateInput = document.getElementById('casteCertificate');

    const specialNeedsRadios = document.querySelectorAll('input[name="physicalDisability"]');
    const specialNeedsDetailsRow = document.getElementById('disabilityDetailsRow');
    const specialNeedsDetailsInput = document.getElementById('disabilityDetails');
    const specialNeedsDetailsLabel = specialNeedsDetailsRow.querySelector('.form-label');


    const tataEmployeeRadios = document.querySelectorAll('input[name="tataEmployee"]');
    const employerNumberRow = document.getElementById('employerNumberRow');
    const employerNumberInput = document.getElementById('employerNumber');
    const classSelect = document.getElementById('class');
    const transferCertificateRow = document.getElementById('transferCertificateRow');
    const transferCertificateInput = document.getElementById('transferCertificate');
    const previousSchoolRow = document.getElementById('previousSchoolRow');
    const previousSchoolInput = document.getElementById('previousSchool');


    const registrationLink = document.getElementById('registration-link');
    const submittedFormsLink = document.getElementById('submitted-forms-link');
    const registrationSection = document.getElementById('registration-section');
    const submittedFormsSection = document.getElementById('submitted-forms-section');


    let editingRow = null;

    function generateFormNumber() {
        return Math.floor(100000 + Math.random() * 900000);
    }

    function setFormNumber() {
        const newFormNumber = generateFormNumber();
        formNumberDisplay.textContent = newFormNumber; // Use textContent for span
        formNumberInput.value = newFormNumber;
    }

    // Set form number on page load
    setFormNumber();


    function toggleCasteCertificateInput() {
        if (casteSelect.value === 'SC' || casteSelect.value === 'ST') {
            casteCertificateRow.classList.remove('hidden-field'); // Use hidden-field for consistency
            casteCertificateInput.setAttribute('required', 'required');
        } else {
            casteCertificateRow.classList.add('hidden-field'); // Use hidden-field for consistency
            casteCertificateInput.removeAttribute('required');
            casteCertificateInput.value = '';
        }
    }

    function toggleSpecialNeedsDetailsInput() {
        let selectedValue = '';
        for (const radio of specialNeedsRadios) {
            if (radio.checked) {
                selectedValue = radio.value;
                break;
            }
        }

        if (selectedValue === 'Yes') {
            specialNeedsDetailsRow.classList.remove('hidden-field'); // Use hidden-field for consistency
            specialNeedsDetailsInput.setAttribute('required', 'required');
            specialNeedsDetailsLabel.textContent = 'Specify:';
        } else {
            specialNeedsDetailsRow.classList.add('hidden-field'); // Use hidden-field for consistency
            specialNeedsDetailsInput.removeAttribute('required');
            specialNeedsDetailsInput.value = '';
            specialNeedsDetailsLabel.textContent = 'Disability Details:';
        }
    }

    function toggleEmployerNumberInput() {
         let selectedValue = '';
        for (const radio of tataEmployeeRadios) {
            if (radio.checked) {
                selectedValue = radio.value;
                break;
            }
        }
        if (selectedValue === 'Yes') {
            employerNumberRow.classList.remove('hidden-field'); // Use hidden-field for consistency
             employerNumberInput.setAttribute('required', 'required');
        } else {
            employerNumberRow.classList.add('hidden-field'); // Use hidden-field for consistency
            employerNumberInput.removeAttribute('required');
            employerNumberInput.value = '';
        }
    }

    function toggleTransferCertificateAndPreviousSchool() {
        const selectedClass = classSelect.value;
        const classNumber = parseInt(selectedClass, 10);
        if (!isNaN(classNumber) && classNumber >= 1 && classNumber <= 10) {
            transferCertificateRow.classList.remove('hidden-field'); // Use hidden-field for consistency
            transferCertificateInput.setAttribute('required', 'required');
            previousSchoolRow.classList.remove('hidden-field'); // Use hidden-field for consistency
            previousSchoolInput.setAttribute('required', 'required');
        } else {
            transferCertificateRow.classList.add('hidden-field'); // Use hidden-field for consistency
            transferCertificateInput.removeAttribute('required');
            transferCertificateInput.value = '';
            previousSchoolRow.classList.add('hidden-field'); // Use hidden-field for consistency
            previousSchoolInput.removeAttribute('required');
            previousSchoolInput.value = '';
        }
    }

    function showRegistrationSection() {
        registrationSection.classList.remove('d-none'); // Use Bootstrap d-none
        submittedFormsSection.classList.add('d-none'); // Use Bootstrap d-none
        registrationLink.classList.add('active');
        submittedFormsLink.classList.remove('active');
    }

    function showSubmittedFormsSection() {
        submittedFormsSection.classList.remove('d-none'); // Use Bootstrap d-none
        registrationSection.classList.add('d-none'); // Use Bootstrap d-none
        submittedFormsLink.classList.add('active');
        registrationLink.classList.remove('active');
    }


    casteSelect.addEventListener('change', toggleCasteCertificateInput);
    specialNeedsRadios.forEach(radio => radio.addEventListener('change', toggleSpecialNeedsDetailsInput));
    tataEmployeeRadios.forEach(radio => radio.addEventListener('change', toggleEmployerNumberInput));
    classSelect.addEventListener('change', toggleTransferCertificateAndPreviousSchool);

    registrationLink.addEventListener('click', function(event) {
        event.preventDefault();
        showRegistrationSection();
    });
    submittedFormsLink.addEventListener('click', function(event) {
        event.preventDefault();
        showSubmittedFormsSection();
    });


    toggleCasteCertificateInput();
    toggleSpecialNeedsDetailsInput();
    toggleEmployerNumberInput();
    toggleTransferCertificateAndPreviousSchool();

    showRegistrationSection();


    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let physicalDisabilityValue = '';
        for (const radio of specialNeedsRadios) {
            if (radio.checked) {
                physicalDisabilityValue = radio.value;
                break;
            }
        }

         let tataEmployeeValue = '';
        for (const radio of tataEmployeeRadios) {
            if (radio.checked) {
                tataEmployeeValue = radio.value;
                break;
            }
        }

        const casteCertificateFile = casteCertificateInput.files.length > 0 ? casteCertificateInput.files[0] : null;
        const casteCertificateFileName = casteCertificateFile ? casteCertificateFile.name : '';

        const transferCertificateFile = transferCertificateInput.files.length > 0 ? transferCertificateInput.files[0] : null;
        const transferCertificateFileName = transferCertificateFile ? transferCertificateFile.name : '';


        const formData = {
            formNumber: formNumberInput.value,
            studentName: document.getElementById('studentName').value,
            dob: document.getElementById('dob').value,
            gender: document.getElementById('gender').value,
            class: document.getElementById('class').value,
            caste: document.getElementById('caste').value,
            casteCertificate: casteCertificateFileName,
            physicalDisability: physicalDisabilityValue,
            disabilityDetails: document.getElementById('disabilityDetails').value,
            transferCertificate: transferCertificateFileName,
            previousSchool: document.getElementById('previousSchool').value,
            fatherName: document.getElementById('fatherName').value,
            fatherQualification: document.getElementById('fatherQualification').value,
            motherName: document.getElementById('motherName').value,
            motherQualification: document.getElementById('motherQualification').value,
            guardianName: document.getElementById('guardianName').value,
            tataEmployee: tataEmployeeValue,
            employerNumber: document.getElementById('employerNumber').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            pincode: document.getElementById('pincode').value,
            mobile: document.getElementById('mobile').value,
            email: document.getElementById('email').value,
        }; if (editingRow) {
            editingRow.cells[0].textContent = formData.formNumber;
            editingRow.cells[1].textContent = formData.studentName;
            editingRow.cells[2].textContent = formData.class;
            editingRow.cells[3].textContent = formData.caste;
            editingRow.cells[4].textContent = formData.casteCertificate || 'No file uploaded';
            editingRow.cells[5].textContent = formData.physicalDisability;
            editingRow.cells[6].textContent = formData.transferCertificate || 'N/A';
            editingRow.cells[7].textContent = formData.previousSchool || 'N/A';
            editingRow.cells[8].textContent = formData.fatherName;
            editingRow.cells[9].textContent = formData.fatherQualification;
            editingRow.cells[10].textContent = formData.motherQualification;
            editingRow.cells[11].textContent = formData.mobile;


            editingRow.dataset.fullData = JSON.stringify(formData);

            editingRow = null;
            submitBtn.textContent = 'Update Admission';
            submitBtn.classList.remove('btn-primary'); // Use Bootstrap class
            submitBtn.classList.add('btn-success'); // Use Bootstrap class


        } else {
            const newRow = dataTableBody.insertRow();
            newRow.innerHTML = `
                <td data-label="Form No.">${formData.formNumber}</td>
                <td data-label="Student Name">${formData.studentName}</td>
                <td data-label="Class">${formData.class}</td>
                <td data-label="Caste">${formData.caste}</td>
                <td data-label="Caste Cert.">${formData.casteCertificate || 'No file uploaded'}</td>
                <td data-label="Special Needs">${formData.physicalDisability}</td>
                <td data-label="Transfer Cert.">${formData.transferCertificate || 'N/A'}</td>
                <td data-label="Previous School">${formData.previousSchool || 'N/A'}</td>
                <td data-label="Father's Name">${formData.fatherName}</td>
                <td data-label="Father's Qual.">${formData.fatherQualification}</td>
                <td data-label="Mother's Qual.">${formData.motherQualification}</td>
                <td data-label="Mobile">${formData.mobile}</td>
                <td data-label="Actions" class="action-buttons">
                    <button class="btn btn-warning edit-btn">Edit</button> <button class="btn btn-danger delete-btn">Delete</button> </td>
            `;
            newRow.dataset.fullData = JSON.stringify(formData);
        }

        form.reset();
        toggleCasteCertificateInput();
        toggleSpecialNeedsDetailsInput();
        toggleEmployerNumberInput();
        toggleTransferCertificateAndPreviousSchool();
        setFormNumber(); });

        dataTableBody.addEventListener('click', function(event) {
            const target = event.target;

            if (target.classList.contains('edit-btn')) { // Check for Bootstrap class
                const row = target.closest('tr');
                const rowData = JSON.parse(row.dataset.fullData);

                document.getElementById('formNumberDisplay').textContent = rowData.formNumber; // Use textContent
                formNumberInput.value = rowData.formNumber;
                document.getElementById('studentName').value = rowData.studentName;
                document.getElementById('dob').value = rowData.dob;
                document.getElementById('gender').value = rowData.gender;
                document.getElementById('class').value = rowData.class;
                document.getElementById('caste').value = rowData.caste;
                casteCertificateInput.value = '';

                document.querySelector(`input[name="physicalDisability"][value="${rowData.physicalDisability}"]`).checked = true;
                document.getElementById('disabilityDetails').value = rowData.disabilityDetails || '';

                transferCertificateInput.value = '';
                document.getElementById('previousSchool').value = rowData.previousSchool || '';


                document.getElementById('fatherName').value = rowData.fatherName;
                document.getElementById('fatherQualification').value = rowData.fatherQualification || '';
                document.getElementById('motherName').value = rowData.motherName;
                document.getElementById('motherQualification').value = rowData.motherQualification || '';
                document.getElementById('guardianName').value = rowData.guardianName || '';

                document.querySelector(`input[name="tataEmployee"][value="${rowData.tataEmployee}"]`).checked = true;
                document.getElementById('employerNumber').value = rowData.employerNumber || '';


                document.getElementById('address').value = rowData.address;
                document.getElementById('city').value = rowData.city;
                document.getElementById('state').value = rowData.state;
                document.getElementById('pincode').value = rowData.pincode;
                document.getElementById('mobile').value = rowData.mobile;
                document.getElementById('email').value = rowData.email || '';

                document.getElementById('studentPhoto').value = '';


                toggleCasteCertificateInput();
                toggleSpecialNeedsDetailsInput();
                toggleEmployerNumberInput();
                toggleTransferCertificateAndPreviousSchool();


                submitBtn.textContent = 'Update Admission';
                 submitBtn.classList.remove('btn-primary'); // Use Bootstrap class
                submitBtn.classList.add('btn-success'); // Use Bootstrap class


                editingRow = row;
                showRegistrationSection(); } else if (target.classList.contains('delete-btn')) { // Check for Bootstrap class
                    const row = target.closest('tr');
                    row.remove();

                    if (editingRow === row) {
                        form.reset();
                        setFormNumber();
                        submitBtn.textContent = 'Submit Admission';
                         submitBtn.classList.remove('btn-success'); // Use Bootstrap class
                        submitBtn.classList.add('btn-primary'); // Use Bootstrap class
                        editingRow = null;
                        toggleCasteCertificateInput();
                        toggleSpecialNeedsDetailsInput();
                        toggleEmployerNumberInput();
                        toggleTransferCertificateAndPreviousSchool();
                    }
                }
            });
        });