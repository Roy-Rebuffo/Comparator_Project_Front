import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})

export class PrivacyPolicyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Tu lógica JavaScript aquí
    const tabLists = document.querySelectorAll(".tabs_list ul li");
    const tabItems = document.querySelectorAll(".tab_item");

    tabLists.forEach((list: any) => {
      list.addEventListener("click", () => {
        const tabData = list.getAttribute("data-tc");

        tabLists.forEach((list: any) => {
          list.classList.remove("active");
        });
        list.classList.add("active");

        tabItems.forEach((item: any) => {
          const tabClass = item.getAttribute("class").split(" ");
          if(tabClass.includes(tabData)){
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

}
