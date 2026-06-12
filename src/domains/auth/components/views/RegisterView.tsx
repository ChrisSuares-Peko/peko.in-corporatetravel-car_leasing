/* eslint-disable import/no-cycle */
import { useAppSelector } from '@src/hooks/store';

import RegisterStepFive from '../sections/RegisterStepFive';
import RegisterStepFour from '../sections/RegisterStepFour';
import RegisterStepOne from '../sections/RegisterStepOne';
import RegisterStepSeven from '../sections/RegisterStepSeven';
// import RegisterStepSix from '../sections/RegisterStepSix2';
import RegisterStepThree from '../sections/RegisterStepThree';
import RegisterStepTwo from '../sections/RegisterStepTwo';

const RegisterView = () => {
    const currentStep = useAppSelector(state => state.reducer.registration.step);

    return (
        <div className="min-h-screen ">
            {currentStep === 1 && <RegisterStepOne />}
            {currentStep === 2 && <RegisterStepTwo />}
            {currentStep === 3 && <RegisterStepThree />}
            {currentStep === 4 && <RegisterStepFour />}
            {currentStep === 5 && <RegisterStepFive />}
            {/* {currentStep === 6 && <RegisterStepSix />} */}
            {currentStep === 6 && <RegisterStepSeven />}
        </div>
    );
};

export default RegisterView;
