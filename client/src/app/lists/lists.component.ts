import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  members: Partial<Member[]>;
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;
  loading = false;
  predicateChange = '';

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadLikes();
    this.predicateChange = this.predicate;
  }

  loadLikes() {
    this.loading = true;
    if (this.predicateChange != this.predicate) {
      this.pageNumber = 1;
    }
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
      this.loading = false;
      this.predicateChange = this.predicate;
    })
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadLikes();
    }
  }

}