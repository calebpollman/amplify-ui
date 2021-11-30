import {
  getActorContext,
  LoginMechanism,
  SignUpContext,
  translate,
} from '@aws-amplify/ui';
import { Flex, ToggleButton, ToggleButtonGroup } from '@aws-amplify/ui-react';
import capitalize from 'lodash/capitalize';
import words from 'lodash/words';
import * as React from 'react';

import { useAuthenticator } from '..';
import { PasswordField, PhoneNumberField, Text, TextField } from '../../..';
import { UserNameAlias as UserNameAliasComponent } from '../shared';

export function FormFields() {
  const { _state, updateBlur } = useAuthenticator();
  const { country_code, formValues, validationError } = getActorContext(
    _state
  ) as SignUpContext;
  const { loginMechanisms, signUpAttributes } = _state.context.config;
  const [loginMechanismIndex, setLoginMechanismIndex] = React.useState(0);

  // Only 1 mechanism can be used for `username`
  const usernameAlias = loginMechanisms[loginMechanismIndex] as LoginMechanism;
  const fieldNames = Array.from(
    new Set([
      // Remove duplicate sign up attribute that's a selected login mechanism
      ...signUpAttributes.filter(
        (attribute) => attribute !== loginMechanisms[loginMechanismIndex]
      ),
    ])
  );

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    updateBlur({ name });
  };

  return (
    <>
      {loginMechanisms.length > 1 && (
        <Flex alignItems="baseline">
          <TextField
            isReadOnly={true}
            label="Login with"
            name="username"
            placeholder="Showing the hidden value of username"
            type="hidden"
            value={formValues[usernameAlias]}
          />
          <ToggleButtonGroup
            isExclusive
            onChange={(value) => setLoginMechanismIndex(Number(value))}
            value={String(loginMechanismIndex)}
          >
            {loginMechanisms.map((alias, i) => (
              <ToggleButton key={alias} value={String(i)}>
                <Text fontSize="var(--amplify-font-sizes-xs)">
                  {capitalize(words(alias).join(' '))}
                </Text>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Flex>
      )}

      <UserNameAliasComponent
        alias={usernameAlias}
        data-amplify-usernamealias
      />

      <PasswordField
        autoComplete="new-password"
        data-amplify-password
        hasError={!!validationError['confirm_password']}
        isRequired
        name="password"
        label={translate('Password')}
        labelHidden={true}
        placeholder={translate('Password')}
        onBlur={handleBlur}
      />

      <PasswordField
        autoComplete="new-password"
        data-amplify-confirmpassword
        placeholder={translate('Confirm Password')}
        hasError={!!validationError['confirm_password']}
        isRequired
        label={translate('Confirm Password')}
        labelHidden={true}
        name="confirm_password"
        onBlur={handleBlur}
      />

      {validationError['confirm_password'] && (
        <Text role="alert" variation="error">
          {validationError['confirm_password']}
        </Text>
      )}

      {fieldNames.flatMap((name) => {
        // See: https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-custom-attributes
        switch (name) {
          case 'birthdate':
            return (
              <TextField
                autoComplete="bday"
                key={name}
                isRequired
                label={translate('Birthdate')}
                name={name}
                placeholder={translate('Birthdate')}
                type="date"
              />
            );

          case 'email':
            return (
              <TextField
                autoComplete="email"
                key={name}
                isRequired
                label={translate('Email')}
                name={name}
                placeholder={translate('Email')}
                type="email"
              />
            );

          case 'family_name':
            return (
              <TextField
                autoComplete="family-name"
                key={name}
                isRequired
                label={translate('Family Name')}
                name={name}
                placeholder={translate('Family Name')}
              />
            );

          case 'given_name':
            return (
              <TextField
                autoComplete="given-name"
                key={name}
                isRequired
                label={translate('Given Name')}
                name={name}
                placeholder={translate('Given Name')}
              />
            );

          case 'middle_name':
            return (
              <TextField
                autoComplete="additional-name"
                key={name}
                isRequired
                label={translate('Middle Name')}
                name={name}
                placeholder={translate('Middle Name')}
              />
            );

          case 'name':
            return (
              <TextField
                autoComplete="name"
                key={name}
                isRequired
                label={translate('Name')}
                name={name}
                placeholder={translate('Name')}
              />
            );

          case 'nickname':
            return (
              <TextField
                key={name}
                isRequired
                label={translate('Nickname')}
                name={name}
                placeholder={translate('Nickname')}
              />
            );

          case 'phone_number':
            return (
              <PhoneNumberField
                autoComplete="tel"
                countryCodeName="country_code"
                defaultCountryCode={country_code}
                // errorMessage={error}
                isRequired
                label={translate('Phone Number')}
                key={name}
                name={name}
                placeholder={translate('Phone Number')}
              />
            );

          case 'preferred_username':
            return (
              <TextField
                isRequired
                key={name}
                label={translate('Preferred Username')}
                name={name}
                placeholder={translate('Preferred Username')}
                required
              />
            );

          case 'profile':
            return (
              <TextField
                autoComplete="url"
                isRequired
                key={name}
                label={translate('Profile')}
                name={name}
                placeholder={translate('Profile')}
                type="url"
              />
            );

          case 'website':
            return (
              <TextField
                autoComplete="url"
                isRequired
                key={name}
                label={translate('Website')}
                name="website"
                placeholder={translate('Website')}
                type="url"
              />
            );

          case 'address':
          case 'gender':
          case 'locale':
          case 'picture':
          case 'updated_at':
          case 'zoneinfo':
          default:
            // There's a `custom:*` attribute or one we don't already have an implementation for
            console.debug(
              `Authenticator does not have a default implementation for ${name}. Customize Authenticator.SignUp.FormFields to add your own.`
            );
        }
      })}
    </>
  );
}
