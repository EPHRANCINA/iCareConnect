import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { SamplesService } from "src/app/shared/services/samples.service";
import { AppState } from "src/app/store/reducers";
import { getProviderDetails } from "src/app/store/selectors/current-user.selectors";

@Component({
  selector: "app-sample-tracking-list",
  templateUrl: "./sample-tracking-list.component.html",
  styleUrls: ["./sample-tracking-list.component.scss"],
})
export class SampleTrackingListComponent implements OnInit {
  @Input() codedSampleRejectionReasons: any;
  @Input() labConfigs: any;
  @Input() datesParameters: any;
  @Input() patients: any[];
  @Input() sampleTypes: any;
  @Input() labSamplesDepartments: any;
  @Input() labSamplesContainers: any;
  @Input() currentUser: any;
  @Input() LISConfigurations: any;
  @Input() userUuid: string;

  acceptedSamples$: Observable<any[]>;
  selectedDepartment: string;
  searchingText: string;
  excludeAllocations: boolean = true;

  page: number = 1;
  pageCount: number = 100;

  savingMessage: any = {};
  providerDetails$: Observable<any>;

  samplesToViewMoreDetails: any = {};
  saving: boolean = false;
  departmentName: string;
  constructor(
    private store: Store<AppState>,
    private sampleService: SamplesService
  ) {}

  ngOnInit(): void {
    this.providerDetails$ = this.store.select(getProviderDetails);
    this.getSamples();
  }

  getSamples(): void {
    this.acceptedSamples$ = this.sampleService.getLabSamplesByCollectionDates(
      this.datesParameters,
      "ACCEPTED",
      "YES",
      this.excludeAllocations,
      null,
      {
        departments: this.labSamplesDepartments,
        specimenSources: this.sampleTypes,
        codedRejectionReasons: this.codedSampleRejectionReasons,
      }
    );
  }

  onToggleViewSampleDetails(event: Event, sample: any): void {
    event.stopPropagation();
    console.log(sample);
  }

  setDepartment(event: Event, departmentName): void {
    event.stopPropagation();
    this.departmentName = departmentName;
  }
}
