#[cfg(test)]
mod snapshot_tests {
    use crate::types::{ArenaConfig, Choice, GameState, PlayerState};
    use soroban_sdk::{Address, Env, TryFromVal, TryIntoVal};
    use soroban_sdk::testutils::Address as _;
    use soroban_sdk::xdr::{ScVal, ToXdr};

    fn to_xdr<T: TryIntoVal<Env, soroban_sdk::Val>>(env: &Env, val: T) -> soroban_sdk::Bytes {
        let v = val.try_into_val(env).expect("Val");
        ScVal::try_from_val(env, &v).expect("ScVal").to_xdr(env)
    }

    #[test]
    fn snapshot_choice() {
        let env = Env::default();
        let h = to_xdr(&env, Choice::Heads);
        let t = to_xdr(&env, Choice::Tails);
        assert!(h.len() > 0);
        assert!(t.len() > 0);
        assert_ne!(h, t);
    }

    #[test]
    fn snapshot_player_state() {
        let env = Env::default();
        assert!(to_xdr(&env, PlayerState { active: true, rounds_survived: 5 }).len() > 0);
    }

    #[test]
    fn snapshot_arena_config() {
        let env = Env::default();
        let config = ArenaConfig {
            admin: Address::generate(&env), stake_token: Address::generate(&env),
            entry_fee: 100, state: GameState::Open, player_count: 42,
            commit_deadline: 1730000000,
            yield_vault: Address::generate(&env),
            round_count: 0,
        };
        assert!(to_xdr(&env, config).len() > 0);
    }

    #[test]
    fn snapshot_game_state() {
        let env = Env::default();
        for state in [GameState::Open, GameState::Active, GameState::Finished, GameState::Cancelled] {
            assert!(to_xdr(&env, state).len() > 0);
        }
    }
}