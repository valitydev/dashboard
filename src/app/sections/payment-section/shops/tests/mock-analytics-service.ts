import { InlineResponse200 } from '@vality/swag-anapi-v2';
import { getTestScheduler } from 'jasmine-marbles';
import { Observable, of, scheduled } from 'rxjs';

export class MockAnalyticsService {
    private innerResponse: InlineResponse200 = {
        result: [],
    };

    getGroupBalances(): Observable<InlineResponse200> {
        return scheduled(of(this.innerResponse), getTestScheduler());
    }

    setMockBalancesResponse(response: InlineResponse200): void {
        this.innerResponse = response;
    }
}
