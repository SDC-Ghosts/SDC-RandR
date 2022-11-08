import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import http from 'k6/http';
import { check, fail } from 'k6';

export const options = {
  vus: 10,
  duration: '10s',
};

export default function testReviewsGet() {
  const randomProductId = Math.floor((Math.random() * (100000))) + 900000;
  const randomReviewId = Math.floor((Math.random() * (500000))) + 5200000;
  const shouldPost = Math.floor(Math.random() * 100) < 25;
  const shouldPutHelpful = Math.floor(Math.random() * 100) < 25;
  const shouldPutReport = Math.floor(Math.random() * 100) < 25;
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
  const postReview = {
    method: 'POST',
    url: `http://localhost:3000/api/fec2/hr-rfp/reviews/`,
    body: {
      product_id: randomProductId,
      rating: 5,
      recommend: true,
      summary: 'Best Thing Ever!',
      body: 'Better then anything. It saved my job, my marraige, and my life. its like a country song in reverse!',
      characteristics: {
        135244: 3, 135245: 3, 135246: 5, 135247: 5,
      },
      name: 'notRandy',
      email: 'notRandy@mail.com',
      photos: ['afakerurltest.com', 'anotherfakeurltest.com', 'anotherfake.url', 'another1fake.url', 'another3fake.url'],
    },
    params: {
      tags: { name: 'postReviewUrl' },
    },
  };
  const putHelpful = {
    method: 'PUT',
    url: `http://localhost:3000/api/fec2/hr-rfp/reviews/${randomReviewId}/helpful`,
    params: {
      tags: { name: 'putHelpfulUrl' },
    },
  };
  const putReport = {
    method: 'PUT',
    url: `http://localhost:3000/api/fec2/hr-rfp/reviews/${randomReviewId}/report`,
    params: {
      tags: { name: 'putReportUrl' },
    },
  };
  let allGets;
  if (shouldPost && shouldPutHelpful && shouldPutReport) {
    const responses = http.batch([getReviews, getReviewsMeta, postReview, putHelpful, putReport]);
    allGets = check(responses[0], {
      success: (r) => r.status == 200,
    }) && check(responses[1], {
      success: (r) => r.status == 200,
    }) && check(responses[2], {
      success: (r) => r.status == 201,
    }) && check(responses[3], {
      success: (r) => r.status == 200,
    }) && check(responses[4], {
      success: (r) => r.status == 200,
    });
  } else if (shouldPost && shouldPutHelpful) {
    const responses = http.batch([getReviews, getReviewsMeta, postReview, putHelpful]);
    allGets = check(responses[0], {
      success: (r) => r.status == 200,
    }) && check(responses[1], {
      success: (r) => r.status == 200,
    }) && check(responses[2], {
      success: (r) => r.status == 201,
    }) && check(responses[3], {
      success: (r) => r.status == 200,
    });
  } else if (shouldPost && shouldPutReport) {
    const responses = http.batch([getReviews, getReviewsMeta, postReview, putReport]);
    allGets = check(responses[0], {
      success: (r) => r.status == 200,
    }) && check(responses[1], {
      success: (r) => r.status == 200,
    }) && check(responses[2], {
      success: (r) => r.status == 201,
    }) && check(responses[3], {
      success: (r) => r.status == 200,
    });
  } else if (shouldPutHelpful && shouldPutReport) {
    const responses = http.batch([getReviews, getReviewsMeta, putHelpful, putReport]);
    allGets = check(responses[0], {
      success: (r) => r.status == 200,
    }) && check(responses[1], {
      success: (r) => r.status == 200,
    }) && check(responses[2], {
      success: (r) => r.status == 200,
    }) && check(responses[3], {
      success: (r) => r.status == 200,
    })
  } else if (shouldPost) {
    const responses = http.batch([getReviews, getReviewsMeta, postReview]);
    allGets = check(responses[0], {
      success: (r) => r.status == 200,
    }) && check(responses[1], {
      success: (r) => r.status == 200,
    }) && check(responses[2], {
      success: (r) => r.status == 201,
    });
  } else if (shouldPutHelpful) {
    const responses = http.batch([getReviews, getReviewsMeta, putHelpful]);
    allGets = check(responses[0], {
      success: (r) => r.status == 200,
    }) && check(responses[1], {
      success: (r) => r.status == 200,
    }) && check(responses[2], {
      success: (r) => r.status == 200,
    });
  } else if (shouldPutReport) {
    const responses = http.batch([getReviews, getReviewsMeta, putReport]);
    allGets = check(responses[0], {
      success: (r) => r.status == 200,
    }) && check(responses[1], {
      success: (r) => r.status == 200,
    }) && check(responses[2], {
      success: (r) => r.status == 200,
    });
  } else {
    const responses = http.batch([getReviews, getReviewsMeta]);
    const bothGets = check(responses[0], {
      success: (r) => r.status == 200,
    }) && check(responses[1], {
      success: (r) => r.status == 200,
    });
  }
  if (!allGets) {
    fail('unexpected responses');
  }
}

export function handleSummary(data) {
  return {
    'interactSummary.html': htmlReport(data),
  };
}
