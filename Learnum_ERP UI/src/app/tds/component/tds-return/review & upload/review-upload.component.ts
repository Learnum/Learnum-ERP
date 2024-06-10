import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'review-upload',
  templateUrl: './review-upload.component.html',
  styleUrls: ['./review-upload.component.scss'],
})
export class ReviewUploadComponent {
  myForm: FormGroup;
  constructor(private fb: FormBuilder) { }
  previousTDSOptions: string[] = ['Option 1', 'Option 2', 'Option 3']; // Add your dynamic options here


  ngOnInit() {
    this.myForm = this.fb.group({
      pendingPANs: ['', [Validators.required]],
      validPANsAndNames: ['', [Validators.required]],
      misMatchedName: ['', [Validators.required]],
      invalidPANs: ['', [Validators.required]],
      inoperativePANs: ['', [Validators.required]],
      previousTDSReturnFiled: ['', [Validators.required]],
      misMatchedChallan: [],
      MatchedChallan: [],
      overBookedChallan: [],
      unMappedEmpWithChallan: [],
      prn: []
    });

    this.patchValue();
  }

  patchValue() {
    this.myForm.patchValue({
      pendingPANs: '325',// Your dummy value here
      validPANsAndNames: '712',
      misMatchedName: '12',
      invalidPANs: '125',
      inoperativePANs: '15',
      misMatchedChallan: '30',
      MatchedChallan: '30',
      overBookedChallan: '30',
      unMappedEmpWithChallan: '30',
      prn: '30'
    });
  }


  onCancleClick() {

  }
}
