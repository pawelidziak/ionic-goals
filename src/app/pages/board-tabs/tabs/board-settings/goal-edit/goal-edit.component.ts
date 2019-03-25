import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Goal} from '@core/models/Goal';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-edit.component.html',
  styleUrls: ['./goal-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoalEditComponent implements OnInit {
  @Input() goal: Goal;
  @Input() isNew: boolean;
  goalForm: FormGroup;
  goalFrequency: any[] = [
    {
      value: 1,
      label: 'Monday'
    },
    {
      value: 2,
      label: 'Tuesday'
    },
    {
      value: 3,
      label: 'Wednesday'
    },
    {
      value: 4,
      label: 'Thursday'
    },
    {
      value: 5,
      label: 'Friday'
    },
    {
      value: 6,
      label: 'Saturday'
    },
    {
      value: 7,
      label: 'Sunday'
    }
  ];


  constructor(private modalController: ModalController,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.goalForm = this.formBuilder.group(
      {
        name: this.goal.name,
        description: this.goal.description,
        number: this.goal.number,
        frequency: [this.goal.frequency]
      }
    );
  }

  private async submitGoal(): Promise<void> {
    await this.modalController.dismiss(this.goalForm.value);
  }

  async dismissGoalModal(): Promise<void> {
    await this.modalController.dismiss();
  }
}
