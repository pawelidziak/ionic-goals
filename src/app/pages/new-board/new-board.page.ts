import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {BOARD_COLORS} from './boardColors';
import {Board} from '@core/models/Board';
import {BoardColor} from '@core/models/BoardColor';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.page.html',
  styleUrls: ['./new-board.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewBoardPage implements OnInit {
  newBoardForm: FormGroup;
  colors: BoardColor[] = BOARD_COLORS;
  selectedColor: string = this.colors[0].hex;

  constructor(private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.newBoardForm = this.createForm({
      title: '',
      color: this.colors[0].value,
      description: '',
      startDate: new Date().toLocaleDateString()
    });
  }

  onSelectChange(ev: CustomEvent): void {
    this.selectedColor = this.getColor(ev.detail.value);
  }

  private createForm(model: Board): FormGroup {
    return this.formBuilder.group(model);
  }

  private updateForm(model: Partial<Board>): void {
    this.newBoardForm.patchValue(model)
  }

  private createBoard(): void {
    // TODO
    console.log(this.newBoardForm.value);
    this.goToBoard();
  }

  private goToBoard(): void {
    this.router.navigate([`/board/${'1'}`]);
  }

  private getColor(value: string): string {
    const index = this.colors.findIndex(x => x.value === value);
    if (index !== -1) {
      this.selectedColor = value;
      return this.colors[index].hex;
    }
    return '#3880ff';
  }
}
