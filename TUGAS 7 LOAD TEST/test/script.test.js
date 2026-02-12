import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(98)<1000'], // 98% request < 1 detik
        http_req_failed: ['rate<0.01'],
        checks: ['rate>0.99']
    },
};

export default function () {
    // LOGIN
    let loginRes = http.post(
        'https://belajar-bareng.onrender.com/api/login',
        JSON.stringify({
            username: 'admin',
            password: 'admin'
        }),
        {
            headers: { 'Content-Type': 'application/json' },
        }
    );

    check(loginRes, {
        'login status is 200': (r) => r.status === 200,
        'login response time < 1s': (r) => r.timings.duration < 1000,
        'token exists': (r) => r.json('token') !== undefined,
    });

    // Ambil token
    let token = loginRes.json('token');
   
    // GET USERS 
    let usersRes = http.get(
        'https://belajar-bareng.onrender.com/users',
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    check(usersRes, {
        'users status is 200': (r) => r.status === 200,
        'users response time < 1s': (r) => r.timings.duration < 1000,
    });

    sleep(1);
}

// HTML REPORT
export function handleSummary(data) {
    return {
        "report/result.html": htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}