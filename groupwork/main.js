
import histogramc from "./histogram copy.js";
import linez from "./linez.js";
import * as d3 from "d3";
import csv_basketball from "./assets/basketball.csv";
import csv_swing from "./assets/prez_results.csv";
import csv_unemployment from "./assets/unemployment.csv";
import us from "./assets/usmap.json";

import election_data from "./assets/2000-2020Election_id.csv"
import xinrow from "./assets/delete.csv"

d3.csv(csv_swing).then((data, error) => {
  if (error) {
    console.log(error);
  } else {
    histogramc(data);
  };
});




d3.csv(xinrow).then((data, error) => {
  if (error) {
    console.log(error);
  }
  else {

    console.log(data);
    linez(data, us);

  };
}); 
