import type { OscalDocumentKey } from '@asap/shared/domain/oscal';

import { AssertionDocumentationOverlay } from './AssertionDocumentationOverlay';
import { DocumentViewerOverlay } from './DocumentViewerOverlay';
import { DevelopersPage } from './DevelopersPage';
import { Footer } from './Footer';
import { Header } from './Header';
import { HomePage } from './HomePage';
import { UsaBanner } from './UsaBanner';
import { ValidatorPage } from './ValidatorPage';
import { useAppContext } from '../context';

const CurrentPage = () => {
  const currentRoute = useAppContext().state.router.currentRoute;

  if (currentRoute.type === 'Home') {
    return <HomePage />;
  } else if (
    currentRoute.type === 'DocumentSummary' ||
    currentRoute.type === 'DocumentPOAM' ||
    currentRoute.type === 'DocumentSAP' ||
    currentRoute.type === 'DocumentSAR' ||
    currentRoute.type === 'DocumentSSP'
  ) {
    const documentType = {
      DocumentSummary: null,
      DocumentPOAM: 'poam',
      DocumentSAP: 'sap',
      DocumentSAR: 'sar',
      DocumentSSP: 'ssp',
    }[currentRoute.type] as OscalDocumentKey | null;
    return (
      <>
        <ValidatorPage
          documentType={documentType}
          rulesetKey={currentRoute.ruleset}
        />
        <AssertionDocumentationOverlay rulesetKey={currentRoute.ruleset} />
        {documentType ? (
          <DocumentViewerOverlay
            documentType={documentType}
            rulesetKey={currentRoute.ruleset}
          />
        ) : null}
      </>
    );
  } else if (currentRoute.type === 'Developers') {
    return <DevelopersPage />;
  } else {
    const _exhaustiveCheck: never = currentRoute;
    return <></>;
  }
};

export const App = () => {
  return (
    <div>
      <UsaBanner />
      <Header />
      <CurrentPage />
      <Footer />
    </div>
  );
};
