import Page from '@/components/helmet-page';
import PlanList from './PlanMappingList';

export default function PLan() {
  return (
    <Page title="Plan List">
      <div className=" mt-3 mb-2">
        <PlanList />
      </div>
    </Page>
  );
}
