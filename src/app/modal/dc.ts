import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class DC {
  Dc_UID?: string = '';
  DcName: string = '';
  Grade: string = 'Non-Premium';
  Block: boolean;
  Address: string = '';
  Location: string = '';
  City: string = '';
  State: string = '';
  Pincode: string = '';
  ContactPerson1Name: string = '';
  ContactPerson1No: string = '';
  ContactPerson2Name: string = '';
  ContactPerson2No: string = '';
  Landline: string = '';
  Email: string = '';
  Spoc_Name: string = '';
  MER: string = 'No';
  X_RAY: string = 'No';
  Lab: string = 'No';
  ECG: string = 'No';
  TwoD_ECHO: string = 'No';
  Urine_Cotinine: string = 'No';
  CTMT: string = 'No';
  USG: string = 'No';
  Female_Tech: string = 'No';
  ReportsTat: string = '0';
  HomeVisit: boolean = false;
  DCVisit: boolean = false;
  TATA_AIG: boolean = false;
  HDFC: boolean = false;
  SBI: boolean = false;
  BankName: string = '';
  AccHolderName: string = '';
  AccountNo: string = '';
  BranchAddress: string = '';
  IfscCode: string = '';
  PanName: string = '';
  PanNo: string = '';
  Mou: any;
  CreditPeriod: string = '';
  BankDetails: any;
  Tariff: any;
  TariffPrice: string = 'None';
  Pis: any;
  RegistrationCertificate: any;
  Photos: any;
  DCGrading: any;
  DCAudit: any;
  otherDocs: any;
  Remarks: string = '';

  static createForm(data: DC = new DC(), disableField = false): FormGroup {
    let fb: FormBuilder = new FormBuilder();
    return fb.group({
      DcName: [
        { value: data.DcName, disabled: disableField },
        [Validators.required],
      ],
      Grade: [
        { value: data.Grade, disabled: disableField },
        [Validators.required],
      ],
      Block: [{ value: data.Block, disabled: disableField }],
      Address: [
        { value: data.Address, disabled: disableField },
        [Validators.required],
      ],
      Location: [{ value: data.Location, disabled: disableField }],
      City: [
        { value: data.City, disabled: disableField },
        [Validators.required],
      ],
      State: [
        { value: data.State, disabled: disableField },
        [Validators.required],
      ],
      Pincode: [
        { value: data.Pincode, disabled: disableField },
        [Validators.required],
      ],
      ContactPerson1Name: [
        { value: data.ContactPerson1Name, disabled: disableField },
        [Validators.required],
      ],
      ContactPerson1No: [
        { value: data.ContactPerson1No, disabled: disableField },
        [Validators.required, Validators.minLength(10)],
      ],
      ContactPerson2Name: [
        { value: data.ContactPerson2Name, disabled: disableField },
      ],
      ContactPerson2No: [
        { value: data.ContactPerson2No, disabled: disableField },
        [Validators.minLength(10)],
      ],
      Landline: [{ value: data.Landline, disabled: disableField }],
      Email: [
        { value: data.Email, disabled: disableField },
        [Validators.required, Validators.email],
      ],
      Spoc_Name: [
        { value: data.Spoc_Name, disabled: disableField },
        [Validators.required],
      ],

      MER: [{ value: data.MER, disabled: disableField }],
      X_RAY: [{ value: data.X_RAY, disabled: disableField }],
      Lab: [{ value: data.Lab, disabled: disableField }],
      ECG: [{ value: data.ECG, disabled: disableField }],
      TwoD_ECHO: [{ value: data.TwoD_ECHO, disabled: disableField }],
      Urine_Cotinine: [{ value: data.Urine_Cotinine, disabled: disableField }],
      CTMT: [{ value: data.CTMT, disabled: disableField }],
      USG: [{ value: data.USG, disabled: disableField }],
      Female_Tech: [{ value: data.Female_Tech, disabled: disableField }],
      ReportsTat: [{ value: data.ReportsTat, disabled: disableField }],
      HomeVisit: [{ value: data.HomeVisit, disabled: disableField }],
      DCVisit: [{ value: data.DCVisit, disabled: disableField }],
      TATA_AIG: [{ value: data.TATA_AIG, disabled: disableField }],
      HDFC: [{ value: data.HDFC, disabled: disableField }],
      SBI: [{ value: data.SBI, disabled: disableField }, [Validators.required]],

      BankName: [
        { value: data.BankName, disabled: disableField },
        [Validators.required],
      ],
      AccHolderName: [
        { value: data.AccHolderName, disabled: disableField },
        [Validators.required],
      ],
      AccountNo: [
        { value: data.AccountNo, disabled: disableField },
        [Validators.required],
      ],
      BranchAddress: [
        { value: data.BranchAddress, disabled: disableField },
        [Validators.required],
      ],
      IfscCode: [
        { value: data.IfscCode, disabled: disableField },
        [Validators.required],
      ],
      PanName: [
        { value: data.PanName, disabled: disableField },
        [Validators.required],
      ],
      PanNo: [
        { value: data.PanNo, disabled: disableField },
        [Validators.required],
      ],
      Mou: [{ value: data.Mou, disabled: disableField }],
      CreditPeriod: [{ value: data.CreditPeriod, disabled: disableField }],
      BankDetails: [{ value: data.BankDetails, disabled: disableField }],

      Tariff: [{ value: data.Tariff, disabled: disableField }],
      TariffPrice: [{ value: data.TariffPrice, disabled: disableField }],
      Pis: [{ value: data.Pis, disabled: disableField }],
      RegistrationCertificate: [
        { value: data.RegistrationCertificate, disabled: disableField },
      ],
      Photos: [{ value: data.Photos, disabled: disableField }],
      DCGrading: [{ value: data.DCGrading, disabled: disableField }],
      DCAudit: [{ value: data.DCAudit, disabled: disableField }],
      otherDocs: [{ value: data.otherDocs, disabled: disableField }],
      Remarks: [{ value: data.Remarks, disabled: disableField }],
    });
  }
  static firstForm(data: DC = new DC(), disableField = false): FormGroup {
    let fb: FormBuilder = new FormBuilder();
    return fb.group({
      DcName: [
        { value: data.DcName, disabled: disableField },
        [Validators.required],
      ],
      Grade: [
        { value: data.Grade, disabled: disableField },
        [Validators.required],
      ],
      Block: [{ value: data.Block, disabled: disableField }],
      Address: [
        { value: data.Address, disabled: disableField },
        [Validators.required],
      ],
      Location: [{ value: data.Location, disabled: disableField }],
      City: [
        { value: data.City, disabled: disableField },
        [Validators.required],
      ],
      State: [
        { value: data.State, disabled: disableField },
        [Validators.required],
      ],
      Pincode: [
        { value: data.Pincode, disabled: disableField },
        [Validators.required],
      ],
      ContactPerson1Name: [
        { value: data.ContactPerson1Name, disabled: disableField },
        [Validators.required],
      ],
      ContactPerson1No: [
        { value: data.ContactPerson1No, disabled: disableField },
        [Validators.required, Validators.minLength(10)],
      ],
      ContactPerson2Name: [
        { value: data.ContactPerson2Name, disabled: disableField },
      ],
      ContactPerson2No: [
        { value: data.ContactPerson2No, disabled: disableField },
        [Validators.minLength(10)],
      ],
      Landline: [{ value: data.Landline, disabled: disableField }],
      Email: [
        { value: data.Email, disabled: disableField },
        [Validators.required, Validators.email],
      ],
      Spoc_Name: [
        { value: data.Spoc_Name, disabled: disableField },
        [Validators.required],
      ],
    });
  }
  static sceondForm(data: DC = new DC(), disableField = false): FormGroup {
    let fb: FormBuilder = new FormBuilder();
    return fb.group({
      MER: [{ value: data.MER, disabled: disableField }],
      X_RAY: [{ value: data.X_RAY, disabled: disableField }],
      Lab: [{ value: data.Lab, disabled: disableField }],
      ECG: [{ value: data.ECG, disabled: disableField }],
      TwoD_ECHO: [{ value: data.TwoD_ECHO, disabled: disableField }],
      Urine_Cotinine: [{ value: data.Urine_Cotinine, disabled: disableField }],
      CTMT: [{ value: data.CTMT, disabled: disableField }],
      USG: [{ value: data.USG, disabled: disableField }],
      Female_Tech: [{ value: data.Female_Tech, disabled: disableField }],
      ReportsTat: [{ value: data.ReportsTat, disabled: disableField }],
      HomeVisit: [{ value: data.HomeVisit, disabled: disableField }],
      DCVisit: [{ value: data.DCVisit, disabled: disableField }],
      TATA_AIG: [{ value: data.TATA_AIG, disabled: disableField }],
      HDFC: [{ value: data.HDFC, disabled: disableField }],
      SBI: [{ value: data.SBI, disabled: disableField }, [Validators.required]],
    });
  }
  static thirdForm(data: DC = new DC(), disableField = false): FormGroup {
    let fb: FormBuilder = new FormBuilder();
    return fb.group({
      BankName: [
        { value: data.BankName, disabled: disableField },
        [Validators.required],
      ],
      AccHolderName: [
        { value: data.AccHolderName, disabled: disableField },
        [Validators.required],
      ],
      AccountNo: [
        { value: data.AccountNo, disabled: disableField },
        [Validators.required],
      ],
      BranchAddress: [
        { value: data.BranchAddress, disabled: disableField },
        [Validators.required],
      ],
      IfscCode: [
        { value: data.IfscCode, disabled: disableField },
        [Validators.required],
      ],
      PanName: [
        { value: data.PanName, disabled: disableField },
        [Validators.required],
      ],
      PanNo: [
        { value: data.PanNo, disabled: disableField },
        [Validators.required],
      ],
    });
  }
  static fourthForm(data: DC = new DC(), disableField = false): FormGroup {
    let fb: FormBuilder = new FormBuilder();
    return fb.group({
      Mou: [{ value: data.Mou, disabled: disableField }],
      CreditPeriod: [{ value: data.CreditPeriod, disabled: disableField }],
      BankDetails: [{ value: data.BankDetails, disabled: disableField }],

      Tariff: [{ value: data.Tariff, disabled: disableField }],
      TariffPrice: [{ value: data.TariffPrice, disabled: disableField }],
      Pis: [{ value: data.Pis, disabled: disableField }],
      RegistrationCertificate: [
        { value: data.RegistrationCertificate, disabled: disableField },
      ],
      Photos: [{ value: data.Photos, disabled: disableField }],
      DCGrading: [{ value: data.DCGrading, disabled: disableField }],
      DCAudit: [{ value: data.DCAudit, disabled: disableField }],
      otherDocs: [{ value: data.otherDocs, disabled: disableField }],
      Remarks: [{ value: data.Remarks, disabled: disableField }],
    });
  }
}
