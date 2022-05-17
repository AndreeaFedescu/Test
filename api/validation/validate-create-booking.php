<?php
class ValidationBooking
{
    const MANDATORY_PARAMETERS = [
        'firstName',
        'lastName',
        'email',
        'address',
        'zipCode',
        'product_id'
    ];

    const EMAIL_PARAMETERS = [
        'email'
    ];

    private $errors = [];

    /**
     * @param array $data
     * @return bool
     */
    public function isValid(array $data): bool
    {
        $isValid = true;
        foreach(self::MANDATORY_PARAMETERS as $parameter) {
            if($this->isRequired($data, $parameter) == false) {
                $this->errors[] = 'Missing parameter '.$parameter.'.';
                $isValid = false;
            }
        }

        foreach(self::EMAIL_PARAMETERS as $parameter) {
           if($this->isEmail($data, $parameter) == false) {
                $this->errors[] = 'Invalid email for parameter '.$parameter.'.';
                $isValid = false;
            }
        }

        return $isValid;
    }

    /**
     * @return array
     */
    public function getErrors():array
    {
        return $this->errors;
    }

    /**
     * @param array $data
     * @return bool
     */
    private function isRequired(array $data, $field): bool
    {
        return isset($data[$field]) && trim($data[$field]) !== '';
    }

    /**
     * @param array $data
     * @return bool
     */
    private function isEmail(array $data, $field): bool
    {
        if (empty($data[$field])) {
            return false;
        }

        return filter_var($data[$field], FILTER_VALIDATE_EMAIL);
    }
}