export function calculateTax(salary: number) {
  if (salary < 2500) {
    return 0;
  } else if (salary < 3200) {
    return salary * 0.075;
  } else if (salary < 4250) {
    return salary * 0.15;
  } else if (salary < 5300) {
    return salary * 0.225;
  } else {
    return salary * 0.275;
  }
}
