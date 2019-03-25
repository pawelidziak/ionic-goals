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
  goalForm: FormGroup;
  @Input() goal: Goal;
  @Input() isNew: boolean;

  constructor(private modalController: ModalController,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.goalForm = this.createForm({
      name: this.goal.name,
      description: this.goal.description,
      number: this.goal.number
    });
  }

  private createForm(model: Goal): FormGroup {
    return this.formBuilder.group(model);
  }

  private updateForm(model: Partial<Goal>): void {
    this.goalForm.patchValue(model)
  }

  private async submitGoal(): Promise<void> {
    await this.modalController.dismiss(this.goalForm.value);
  }

  async dismissGoalModal(): Promise<void> {
    await this.modalController.dismiss();
  }
}
