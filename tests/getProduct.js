import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import http from 'k6/http';
import { check, fail } from 'k6';

export const options = {
  vus: 1000,
  duration: '60s',
};

export default function testReviewsGet() {
  const randomProductId = Math.floor((Math.random() * (100000))) + 900000;
  const getReviews = {
    method: 'GET',
    url: `http://localhost:3000/api/fec2/hr-rfp/reviews?product_id=${randomProductId}`,
    params: {
      tags: { name: 'getReviewsUrl' },
    },
  };
  const getReviewsMeta = {
    method: 'GET',
    url: `http://localhost:3000/api/fec2/hr-rfp/reviews/meta?product_id=${randomProductId}`,
    params: {
      tags: { name: 'getReviewsMetaUrl' },
    },
  };
  const responses = http.batch([getReviews, getReviewsMeta]);
  const bothGets = check(responses[0], {
    success: (r) => r.status == 200,
  }) && check(responses[1], {
    success: (r) => r.status == 200,
  });
  if (!bothGets) {
    fail('unexpected responses');
  }
}

export function handleSummary(data) {
  return {
    'summary.html': htmlReport(data),
  };
}
